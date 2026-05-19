import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { EmailShell, H1, Label, Lede, PrimaryButton, Quote } from './_layout.tsx'

interface Selection {
  name: string
  category?: string
  price?: string
}

interface Props {
  customerName?: string
  customerEmail?: string
  business?: string
  message?: string
  selections?: Selection[]
  submittedAt?: string
}

const ContactMessageOwnerEmail = ({
  customerName,
  customerEmail,
  business,
  message,
  selections = [],
  submittedAt,
}: Props) => (
  <EmailShell preview={`New contact message${customerName ? ` from ${customerName}` : ''}`}>
    <H1>New message from the contact form.</H1>
    <Lede>
      <strong>{customerName ?? 'Someone'}</strong>
      {business ? <> at <strong>{business}</strong></> : null}
      {' '}just reached out through the site
      {submittedAt ? ` on ${submittedAt}` : ''}.
    </Lede>

    <Label>Reply to</Label>
    <Quote>{customerEmail ?? '—'}</Quote>

    {message ? (
      <>
        <Label>Message</Label>
        <Quote>{message}</Quote>
      </>
    ) : null}

    {selections.length > 0 ? (
      <>
        <Label>Selections at submission</Label>
        <Quote>
          {selections
            .map((s) => `${s.name}${s.price ? ` (${s.price})` : ''}`)
            .join(' · ')}
        </Quote>
      </>
    ) : null}

    {customerEmail ? (
      <PrimaryButton href={`mailto:${customerEmail}`}>Reply directly</PrimaryButton>
    ) : null}
  </EmailShell>
)

export const template = {
  component: ContactMessageOwnerEmail,
  subject: (data: Record<string, any>) =>
    `New contact message${data?.customerName ? ` from ${data.customerName}` : ''}${
      data?.business ? ` · ${data.business}` : ''
    }`,
  to: 'hello@buildyourfootprint.com',
  displayName: 'Contact message — owner notification',
  previewData: {
    customerName: 'Porsia',
    customerEmail: 'porsia@example.com',
    business: 'Atelier Maison',
    message:
      'We are launching a new boutique brand and need a strategic partner to shape our digital presence.',
    selections: [
      { name: 'Signature', category: 'Build package', price: '$1,499' },
      { name: 'Growth Care', category: 'Care plan', price: '$59/mo' },
    ],
    submittedAt: 'May 19, 2026, 9:32 AM',
  },
} satisfies TemplateEntry