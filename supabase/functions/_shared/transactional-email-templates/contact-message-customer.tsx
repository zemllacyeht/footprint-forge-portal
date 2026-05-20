import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Build Your Footprint'
const SITE_URL = 'https://www.buildyourfootprint.com'

interface ContactMessageCustomerProps {
  customerName?: string
  business?: string
  message?: string
}

const ContactMessageCustomerEmail = ({
  customerName,
  business,
  message,
}: ContactMessageCustomerProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <meta name="x-apple-disable-message-reformatting" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    </Head>
    <Preview>Your message is in. We will reply within 24 hours.</Preview>
    <Body style={main}>
      <Container style={outerWrap}>
        <Container style={card}>
          {/* Header */}
          <Section style={headerSection}>
            <Img
              src={`${SITE_URL}/email-logo.png`}
              alt={SITE_NAME}
              width="40"
              height="40"
              style={brandLogo}
            />
            <Text style={brandKicker}>BUILD YOUR FOOTPRINT</Text>
            <Text style={brandOrnament}>✦</Text>
          </Section>

          <Section style={dividerWrap}>
            <Hr style={topDivider} />
            <Section style={goldAccentBar} />
          </Section>

          {/* Greeting */}
          <Section style={bodySection}>
            <Heading style={h1}>
              {customerName ? `Thank you, ${customerName}.` : 'Thank you for reaching out.'}
            </Heading>
            <Text style={lede}>
              Your message has landed with our team. We are excited to hear about
              {business ? ' ' : ' your project'}
              {business ? <span style={businessName}>{business}</span> : null}
              {business ? ' and will personally review the details you shared.' : '.'}
              {' '}Expect a thoughtful reply <span style={emphasis}>within 24 hours</span> with
              next steps and a free strategy call invitation.
            </Text>
          </Section>

          {/* Message recap */}
          {message ? (
            <Section style={selectionWrap}>
              <Section style={selectionCard}>
                <Text style={selectionLabel}>YOUR MESSAGE</Text>
                <Text style={messageBody}>{message}</Text>
              </Section>
            </Section>
          ) : null}

          {/* What happens next */}
          <Section style={nextWrap}>
            <Text style={nextLabel}>WHAT HAPPENS NEXT</Text>
            <Text style={nextItem}>
              <span style={nextNum}>01</span> We review your message and goals
            </Text>
            <Text style={nextItem}>
              <span style={nextNum}>02</span> A founder replies within 24 hours
            </Text>
            <Text style={nextItemLast}>
              <span style={nextNum}>03</span> We schedule your free strategy call
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaWrap}>
            <Button href={SITE_URL} style={ctaButton}>
              Explore Our Work
            </Button>
          </Section>

          {/* Signature */}
          <Section style={signatureWrap}>
            <Hr style={bottomDivider} />
            <Text style={signoffLine}>With care,</Text>
            <Text style={signoffName}>The {SITE_NAME} team</Text>
          </Section>
        </Container>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactMessageCustomerEmail,
  subject: `Your message is in. We will reply within 24 hours.`,
  displayName: 'Contact message — customer confirmation',
  previewData: {
    customerName: 'Porsia',
    business: 'Atelier Maison',
    message:
      'We are launching a new boutique brand and need a strategic partner to shape our digital presence, from positioning to a refined website.',
  },
} satisfies TemplateEntry

// Email-safe font stacks
const SERIF_STACK =
  "Georgia, 'Times New Roman', Times, 'Hoefler Text', Garamond, serif"
const SANS_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const GOLD = '#E5B546'
const GREEN = '#2B5B4B'

const main = {
  backgroundColor: '#ffffff',
  fontFamily: SANS_STACK,
  margin: 0,
  padding: '40px 20px',
  msoLineHeightRule: 'exactly' as const,
}
const outerWrap = {
  backgroundColor: '#F3F2EF',
  padding: '40px 20px',
  maxWidth: '100%',
  width: '100%',
  margin: 0,
}
const card = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  padding: 0,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  borderTop: `3px solid ${GOLD}`,
}
const headerSection = {
  padding: '40px 40px 20px 40px',
  textAlign: 'center' as const,
}
const brandLogo = {
  display: 'block',
  margin: '0 auto 12px',
  width: '40px',
  height: '40px',
  border: 0,
  outline: 'none',
  textDecoration: 'none',
}

const brandKicker = {
  margin: 0,
  fontFamily: SANS_STACK,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '4px',
  color: GOLD,
  textTransform: 'uppercase' as const,
}
const brandOrnament = {
  margin: '12px 0 0',
  color: GOLD,
  fontSize: '14px',
  letterSpacing: '0.4em',
  fontFamily: SERIF_STACK,
}
const dividerWrap = { padding: '0 40px' }
const topDivider = {
  border: 0,
  borderTop: '1px solid #E8E6E1',
  margin: 0,
}
const goldAccentBar = {
  width: '48px',
  height: '2px',
  backgroundColor: GOLD,
  margin: '18px auto 0',
}
const bodySection = { padding: '28px 40px 25px 40px' }
const h1 = {
  margin: '0 0 16px',
  fontFamily: SERIF_STACK,
  fontSize: '28px',
  fontWeight: 400,
  color: '#2D2A26',
  lineHeight: '1.2',
  letterSpacing: '-0.01em',
}
const lede = {
  margin: '0 0 20px',
  fontFamily: SANS_STACK,
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#5B5752',
}
const businessName = {
  fontFamily: SERIF_STACK,
  fontStyle: 'italic' as const,
  color: GREEN,
  fontWeight: 500,
}
const emphasis = {
  color: GREEN,
  fontWeight: 700,
  borderBottom: `2px solid ${GOLD}`,
  paddingBottom: '1px',
}

const selectionWrap = { padding: '0 40px 24px' }
const selectionCard = {
  backgroundColor: '#F9F8F6',
  borderLeft: `4px solid ${GREEN}`,
  borderRadius: '0 6px 6px 0',
  padding: '20px 24px',
}
const selectionLabel = {
  margin: '0 0 10px',
  fontFamily: SANS_STACK,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  color: GOLD,
  textTransform: 'uppercase' as const,
}
const messageBody = {
  margin: 0,
  fontFamily: SERIF_STACK,
  fontStyle: 'italic' as const,
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#2D2A26',
}

const nextWrap = { padding: '0 40px 28px' }
const nextLabel = {
  margin: '0 0 14px',
  fontFamily: SANS_STACK,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  color: GOLD,
  textTransform: 'uppercase' as const,
}
const nextItem = {
  margin: '0 0 10px',
  fontFamily: SANS_STACK,
  fontSize: '15px',
  color: '#2D2A26',
  lineHeight: '1.6',
}
const nextItemLast = {
  margin: 0,
  fontFamily: SANS_STACK,
  fontSize: '15px',
  color: '#2D2A26',
  lineHeight: '1.6',
}
const nextNum = {
  fontFamily: SERIF_STACK,
  fontStyle: 'italic' as const,
  color: GOLD,
  fontWeight: 600,
  marginRight: '12px',
  fontSize: '14px',
  letterSpacing: '0.05em',
}

const ctaWrap = {
  padding: '0 40px 35px',
  textAlign: 'center' as const,
}
const ctaButton = {
  display: 'inline-block',
  backgroundColor: GREEN,
  color: '#ffffff',
  fontFamily: SANS_STACK,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  padding: '16px 36px',
  borderRadius: '6px',
  border: `2px solid ${GREEN}`,
  boxShadow: `0 0 0 3px rgba(229, 181, 70, 0.15)`,
}

const signatureWrap = { padding: '0 40px 40px' }
const bottomDivider = {
  border: 0,
  borderTop: '1px solid #E8E6E1',
  margin: '0 0 20px',
}
const signoffLine = {
  margin: 0,
  fontFamily: SERIF_STACK,
  fontStyle: 'italic' as const,
  fontSize: '18px',
  color: '#2D2A26',
}
const signoffName = {
  margin: '8px 0 0',
  fontFamily: SERIF_STACK,
  fontSize: '17px',
  fontStyle: 'italic' as const,
  fontWeight: 500,
  color: GOLD,
}
