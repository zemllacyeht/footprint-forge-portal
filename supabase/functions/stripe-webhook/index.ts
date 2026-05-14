import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@17'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const admin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

async function notifyReceipt(
  userId: string,
  amountCents: number,
  currency: string,
  invoiceUrl: string | null,
  invoiceId: string,
) {
  try {
    const { data: profile } = await admin.from('profiles').select('email, contact_name, company_name').eq('id', userId).maybeSingle()
    if (!profile?.email) return
    await admin.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'payment-receipt',
        recipientEmail: profile.email,
        templateData: {
          recipientName: profile.contact_name || profile.company_name || 'there',
          amount: (amountCents / 100).toFixed(2),
          currency: currency.toUpperCase(),
          invoiceUrl,
        },
        idempotencyKey: `receipt-${invoiceId}`,
      },
    })
  } catch (e) {
    console.error('notifyReceipt error', e)
  }
}

async function resolveUserIdFromCustomer(customerId: string, stripe: Stripe): Promise<string | null> {
  const { data: sub } = await admin
    .from('client_subscriptions')
    .select('client_id')
    .eq('stripe_customer_id', customerId)
    .limit(1)
    .maybeSingle()
  if (sub?.client_id) return sub.client_id as string
  try {
    const cust = await stripe.customers.retrieve(customerId)
    if (!('deleted' in cust) || !cust.deleted) {
      const meta = (cust as Stripe.Customer).metadata || {}
      if (meta.supabase_user_id) return meta.supabase_user_id
    }
  } catch (_) { /* ignore */ }
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  if (!stripeKey || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Stripe is not configured yet.' }), {
      status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any })
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400, headers: corsHeaders })

  const rawBody = await req.text()
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret)
  } catch (e) {
    console.error('Signature verification failed', e)
    return new Response(`Webhook Error: ${(e as Error).message}`, { status: 400, headers: corsHeaders })
  }

  // Idempotency
  const { data: seen } = await admin.from('stripe_events').select('event_id').eq('event_id', event.id).maybeSingle()
  if (seen) return new Response(JSON.stringify({ received: true, duplicate: true }), { headers: corsHeaders })

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = (session.metadata?.supabase_user_id as string) || null
        const planId = (session.metadata?.plan_id as string) || null
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
        if (userId && customerId && subscriptionId) {
          const stripeSub = await stripe.subscriptions.retrieve(subscriptionId)
          await admin.from('client_subscriptions').upsert({
            client_id: userId,
            plan_id: planId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: stripeSub.status,
            current_period_end: new Date(stripeSub.current_period_end * 1000).toISOString(),
            cancel_at: stripeSub.cancel_at ? new Date(stripeSub.cancel_at * 1000).toISOString() : null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_subscription_id' })
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
        const userId = (sub.metadata?.supabase_user_id as string) || await resolveUserIdFromCustomer(customerId, stripe)
        if (userId) {
          await admin.from('client_subscriptions').upsert({
            client_id: userId,
            plan_id: (sub.metadata?.plan_id as string) || null,
            stripe_customer_id: customerId,
            stripe_subscription_id: sub.id,
            status: sub.status,
            current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
            cancel_at: sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null,
            canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_subscription_id' })
        }
        break
      }
      case 'invoice.paid': {
        const inv = event.data.object as Stripe.Invoice
        const customerId = typeof inv.customer === 'string' ? inv.customer : inv.customer?.id
        const userId = customerId ? await resolveUserIdFromCustomer(customerId, stripe) : null
        if (userId && inv.id) {
          const invoiceNumber = inv.number || inv.id
          await admin.from('client_invoices').upsert({
            client_id: userId,
            invoice_number: invoiceNumber,
            amount_cents: inv.amount_paid ?? inv.amount_due ?? 0,
            currency: (inv.currency || 'usd').toUpperCase(),
            description: inv.lines?.data?.[0]?.description || 'Stripe payment',
            status: 'paid',
            issued_at: inv.created ? new Date(inv.created * 1000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
            paid_at: inv.status_transitions?.paid_at ? new Date(inv.status_transitions.paid_at * 1000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
            external_url: inv.hosted_invoice_url || null,
            stripe_invoice_id: inv.id,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_invoice_id' })
          await notifyReceipt(userId, inv.amount_paid ?? 0, inv.currency || 'usd', inv.hosted_invoice_url || null, inv.id)
        }
        break
      }
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice
        const customerId = typeof inv.customer === 'string' ? inv.customer : inv.customer?.id
        const userId = customerId ? await resolveUserIdFromCustomer(customerId, stripe) : null
        if (userId && inv.id) {
          await admin.from('client_invoices').upsert({
            client_id: userId,
            invoice_number: inv.number || inv.id,
            amount_cents: inv.amount_due ?? 0,
            currency: (inv.currency || 'usd').toUpperCase(),
            description: 'Payment failed',
            status: 'overdue',
            issued_at: new Date().toISOString().slice(0, 10),
            external_url: inv.hosted_invoice_url || null,
            stripe_invoice_id: inv.id,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'stripe_invoice_id' })
        }
        break
      }
      default:
        // ignore
        break
    }

    await admin.from('stripe_events').insert({ event_id: event.id, event_type: event.type })
  } catch (e) {
    console.error('webhook handler error', e)
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})