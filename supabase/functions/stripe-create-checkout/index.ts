import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@17'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: 'Stripe is not configured yet.' }), {
        status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token)
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userId = claims.claims.sub as string
    const userEmail = claims.claims.email as string | undefined

    const body = await req.json().catch(() => ({}))
    const planId = body?.planId as string | undefined
    const successUrl = (body?.successUrl as string) || `${req.headers.get('origin') || ''}/portal?billing=success`
    const cancelUrl = (body?.cancelUrl as string) || `${req.headers.get('origin') || ''}/portal?billing=cancel`
    if (!planId) {
      return new Response(JSON.stringify({ error: 'planId is required' }), { status: 400, headers: corsHeaders })
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const { data: plan, error: planErr } = await admin
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .eq('active', true)
      .maybeSingle()
    if (planErr || !plan) {
      return new Response(JSON.stringify({ error: 'Plan not available' }), { status: 404, headers: corsHeaders })
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any })

    // Reuse existing customer if present
    const { data: existingSub } = await admin
      .from('client_subscriptions')
      .select('stripe_customer_id')
      .eq('client_id', userId)
      .not('stripe_customer_id', 'is', null)
      .limit(1)
      .maybeSingle()

    let customerId = existingSub?.stripe_customer_id as string | undefined
    if (!customerId) {
      const found = await stripe.customers.list({ email: userEmail, limit: 1 })
      customerId = found.data[0]?.id
      if (!customerId) {
        const created = await stripe.customers.create({
          email: userEmail,
          metadata: { supabase_user_id: userId },
        })
        customerId = created.id
      }
    }

    const lineItem = plan.stripe_price_id
      ? { price: plan.stripe_price_id as string, quantity: 1 }
      : {
          price_data: {
            currency: plan.currency || 'usd',
            product_data: { name: plan.name as string, description: plan.description ?? undefined },
            unit_amount: plan.amount_cents as number,
            recurring: { interval: (plan.interval as 'month' | 'year') || 'month' },
          },
          quantity: 1,
        }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [lineItem as any],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { supabase_user_id: userId, plan_id: planId },
      subscription_data: { metadata: { supabase_user_id: userId, plan_id: planId } },
      allow_promotion_codes: true,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('stripe-create-checkout error', e)
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
