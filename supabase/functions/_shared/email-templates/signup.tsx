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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <link href={brand.fontsHref} rel="stylesheet" />
    </Head>
    <Preview>Confirm your email for {siteName}</Preview>
    <Body style={brand.main}>
      <Container style={brand.outerContainer}>
        <Section style={brand.brandRow}>
          <Text style={brand.brandMark}>Build Your Footprint</Text>
        </Section>

        <Container style={brand.card}>
          <Heading style={brand.h1}>Confirm your email.</Heading>

          <Text style={brand.text}>
            Thanks for joining {siteName}. Please confirm{' '}
            <Link href={`mailto:${recipient}`} style={brand.inlineLink}>
              {recipient}
            </Link>{' '}
            to activate your client portal.
          </Text>

          <Section style={brand.buttonWrapper}>
            <Button style={brand.button} href={confirmationUrl}>
              Verify email
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
            If you didn't create an account, you can safely ignore this email.
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

export default SignupEmail
