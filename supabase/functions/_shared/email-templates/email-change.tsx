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

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href={brand.fontsHref} rel="stylesheet" />
    </Head>
    <Preview>Confirm your email change for {siteName}</Preview>
    <Body style={brand.main}>
      <Container style={brand.outerContainer}>
        <Section style={brand.brandRow}>
          <Text style={brand.brandMark}>Build Your Footprint</Text>
        </Section>

        <Container style={brand.card}>
          <Heading style={brand.h1}>Confirm your email change.</Heading>

          <Text style={brand.text}>
            You requested to change the email on your {siteName} account from{' '}
            <Link href={`mailto:${oldEmail}`} style={brand.inlineLink}>
              {oldEmail}
            </Link>{' '}
            to{' '}
            <Link href={`mailto:${newEmail}`} style={brand.inlineLink}>
              {newEmail}
            </Link>
            .
          </Text>

          <Section style={brand.buttonWrapper}>
            <Button style={brand.button} href={confirmationUrl}>
              Confirm change
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
            If you didn't request this change, please secure your account immediately.
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

export default EmailChangeEmail
