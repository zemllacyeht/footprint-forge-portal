import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Build Your Footprint'

interface CartItem {
  name: string
  price: string
  quantity: number
  category?: string
}

interface CartRequestCustomerProps {
  customerName?: string
  items?: CartItem[]
}

const CartRequestCustomerEmail = ({
  customerName,
  items = [],
}: CartRequestCustomerProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We've received your request — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {customerName ? `Thanks, ${customerName}!` : 'Thanks for reaching out!'}
        </Heading>
        <Text style={text}>
          We've received your request and a member of the {SITE_NAME} team will
          be in touch within one business day to walk through next steps and
          confirm pricing for your selection.
        </Text>

        <Heading as="h2" style={h2}>Your requested items</Heading>
        {items.length === 0 ? (
          <Text style={text}>No items listed.</Text>
        ) : (
          items.map((it, i) => (
            <Section key={i} style={itemRow}>
              <Text style={itemName}>
                {it.name}{it.category ? ` · ${it.category}` : ''}
              </Text>
              <Text style={itemMeta}>
                {it.price}{it.quantity > 1 ? ` · Qty ${it.quantity}` : ''}
              </Text>
            </Section>
          ))
        )}

        <Hr style={hr} />
        <Text style={text}>
          If anything has changed or you'd like to add to your request, just
          reply to this email — we'll take it from there.
        </Text>
        <Text style={footer}>— The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CartRequestCustomerEmail,
  subject: `We've received your request — ${SITE_NAME}`,
  displayName: 'Cart request — customer confirmation',
  previewData: {
    customerName: 'Jane',
    items: [
      { name: 'Signature', price: '$1,499', quantity: 1, category: 'Build package' },
      { name: 'Growth Care', price: '$59/mo', quantity: 1, category: 'Care plan' },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px' }
const h1 = { fontSize: '24px', fontWeight: 600, color: '#0a0a0a', margin: '0 0 12px' }
const h2 = { fontSize: '16px', fontWeight: 600, color: '#0a0a0a', margin: '28px 0 12px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }
const text = { fontSize: '14px', color: '#404040', lineHeight: '1.6', margin: '0 0 16px' }
const itemRow = { borderBottom: '1px solid #e5e5e5', padding: '12px 0' }
const itemName = { fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: '0 0 2px' }
const itemMeta = { fontSize: '13px', color: '#737373', margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#737373', margin: '0' }
