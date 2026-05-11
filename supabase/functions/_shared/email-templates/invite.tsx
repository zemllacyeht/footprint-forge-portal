/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

import { brand } from './brand.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href={brand.fontsHref} rel="stylesheet" />
    </Head>
    <Preview>You're invited to {siteName}</Preview>
    <Body style={brand.main}>
      <Container style={brand.outerContainer}>
        <Section style={brand.brandRow}>
          <Text style={brand.brandMark}>Build Your Footprint</Text>
        </Section>

        <Container style={brand.card}>
          <Heading style={brand.h1}>You're invited.</Heading>

          <Text style={brand.text}>
            Welcome to {siteName}. Your private client portal is ready, where you can preview your site, leave feedback, and manage invoices in one place.
          </Text>

          <Section style={brand.buttonWrapper}>
            <Button style={brand.button} href={confirmationUrl}>
              Accept invitation
            </Button>
          </Section>

          <Text style={brand.smallNote}>
            Or copy and paste this link into your browser:
            <br />
            <Link href={confirmationUrl} style={brand.inlineLink}>
              {confirmationUrl}
            </Link>
          </Text>

          <Text style={brand.footer}>
            If you weren't expecting this invitation, you can safely ignore this email.
          </Text>
        </Container>

        <Text style={brand.signOff}>
          Build Your Footprint Web Services
          <br />
          <Link href="https://buildyourfootprint.com" style={brand.signOffLink}>
            buildyourfootprint.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
