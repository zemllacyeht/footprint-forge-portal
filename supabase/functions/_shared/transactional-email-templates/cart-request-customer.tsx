import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Build Your Footprint'
const SITE_URL = 'https://www.buildyourfootprint.com'

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
    <Preview>Your request is in — we'll be in touch within 24 hours</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Brand header */}
        <Section style={header}>
          <Text style={brandMark}>{SITE_NAME}</Text>
          <Text style={brandRule}>—</Text>
        </Section>

        <Heading style={h1}>
          {customerName ? `Thank you, ${customerName}.` : 'Thank you for reaching out.'}
        </Heading>

        <Text style={lede}>
          Your request is in good hands. A member of our team will personally
          review the details and reply <strong style={emphasis}>within 24 hours</strong>{' '}
          with next steps and confirmed pricing.
        </Text>

        <Heading as="h2" style={h2}>What you requested</Heading>
        <Section style={itemsCard}>
          {items.length === 0 ? (
            <Text style={text}>No items listed.</Text>
          ) : (
            items.map((it, i) => (
              <Section
                key={i}
                style={i === items.length - 1 ? itemRowLast : itemRow}
              >
                <Text style={itemName}>
                  {it.name}
                  {it.category ? <span style={itemCategory}> · {it.category}</span> : null}
                </Text>
                <Text style={itemMeta}>
                  {it.price}{it.quantity > 1 ? ` · Qty ${it.quantity}` : ''}
                </Text>
              </Section>
            ))
          )}
        </Section>

        <Section style={ctaWrap}>
          <Button href={SITE_URL} style={ctaButton}>
            Visit our site
          </Button>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          Need to add to your request or share more about your goals? Just reply
          to this email — it goes straight to our team.
        </Text>

        <Text style={signoff}>
          With care,<br />
          <span style={signoffName}>The {SITE_NAME} team</span>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CartRequestCustomerEmail,
  subject: `Your request is in — we'll be in touch within 24 hours`,
  displayName: 'Cart request — customer confirmation',
  previewData: {
    customerName: 'Jane',
    items: [
      { name: 'Signature', price: '$1,499', quantity: 1, category: 'Build package' },
      { name: 'Growth Care', price: '$59/mo', quantity: 1, category: 'Care plan' },
    ],
  },
} satisfies TemplateEntry

// Brand palette (HSL values translated to hex for email client compatibility)
// emerald primary ~ #29B07A, gold accent ~ #E5B546, ink ~ #0B1410
const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '40px 16px',
}
const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 36px',
  backgroundColor: '#ffffff',
  border: '1px solid #ececec',
  borderRadius: '12px',
}
const header = { marginBottom: '28px' }
const brandMark = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#0B1410',
  margin: 0,
}
const brandRule = {
  color: '#E5B546',
  fontSize: '14px',
  margin: '6px 0 0',
  letterSpacing: '0.4em',
}
const h1 = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontSize: '28px',
  fontWeight: 500,
  lineHeight: '1.25',
  color: '#0B1410',
  margin: '0 0 16px',
}
const lede = {
  fontSize: '15px',
  color: '#3a423f',
  lineHeight: '1.7',
  margin: '0 0 28px',
}
const emphasis = { color: '#0B1410', fontWeight: 600 }
const h2 = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#6b7570',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.16em',
}
const text = { fontSize: '14px', color: '#3a423f', lineHeight: '1.6', margin: '0 0 16px' }
const itemsCard = {
  backgroundColor: '#fafaf7',
  border: '1px solid #ececec',
  borderRadius: '8px',
  padding: '4px 18px',
  margin: '0 0 28px',
}
const itemRow = { borderBottom: '1px solid #ececec', padding: '14px 0' }
const itemRowLast = { padding: '14px 0' }
const itemName = { fontSize: '15px', fontWeight: 500, color: '#0B1410', margin: '0 0 2px' }
const itemCategory = { color: '#6b7570', fontWeight: 400 }
const itemMeta = { fontSize: '13px', color: '#6b7570', margin: 0 }
const ctaWrap = { textAlign: 'center' as const, margin: '8px 0 8px' }
const ctaButton = {
  backgroundColor: '#0B1410',
  color: '#E5B546',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#ececec', margin: '32px 0 24px' }
const signoff = { fontSize: '14px', color: '#3a423f', lineHeight: '1.6', margin: '20px 0 0' }
const signoffName = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  fontStyle: 'italic' as const,
  color: '#0B1410',
}
