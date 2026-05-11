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

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href={brand.fontsHref} rel="stylesheet" />
    </Head>
    <Preview>Your sign-in link for {siteName}</Preview>
    <Body style={brand.main}>
      <Container style={brand.outerContainer}>
        <Section style={brand.brandRow}>
          <Text style={brand.brandMark}>Build Your Footprint</Text>
        </Section>

        <Container style={brand.card}>
          <Heading style={brand.h1}>Your sign-in link.</Heading>

          <Text style={brand.text}>
            Click the button below to sign in to your {siteName} client portal. This link will expire shortly.
          </Text>

          <Section style={brand.buttonWrapper}>
            <Button style={brand.button} href={confirmationUrl}>
              Sign in
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
            If you didn't request this link, you can safely ignore this email.
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

export default MagicLinkEmail
