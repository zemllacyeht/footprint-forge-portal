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

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href={brand.fontsHref} rel="stylesheet" />
    </Head>
    <Preview>Reset your {siteName} password</Preview>
    <Body style={brand.main}>
      <Container style={brand.outerContainer}>
        <Section style={brand.brandRow}>
          <Text style={brand.brandMark}>Build Your Footprint</Text>
        </Section>

        <Container style={brand.card}>
          <Heading style={brand.h1}>Reset your password.</Heading>

          <Text style={brand.text}>
            We received a request to reset the password on your {siteName} client portal. Click the button below to choose a new password.
          </Text>

          <Section style={brand.buttonWrapper}>
            <Button style={brand.button} href={confirmationUrl}>
              Reset password
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
            If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
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

export default RecoveryEmail
