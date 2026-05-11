/**
 * Build Your Footprint (BYF) brand tokens, single source of truth.
 *
 * Used by:
 *   1. The portal / marketing site (this file is imported into React components
 *      and mirrors the HSL CSS variables in `src/index.css`).
 *   2. The auth email templates, via
 *      `supabase/functions/_shared/email-templates/brand.ts` which re-exports
 *      the `email` block below.
 *
 * If you change a color, font, or copy value here you must also update the
 * matching HSL value in `src/index.css` (the values are listed inline beside
 * each token below to make this easy).
 */

export const BYF_BRAND = {
  name: 'Build Your Footprint',
  shortName: 'BYF',
  tagline: 'Premium Web Design and Brand Identity',
  legalName: 'Build Your Footprint Web Services',
  domain: 'buildyourfootprint.com',
  url: 'https://www.buildyourfootprint.com',

  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', Arial, sans-serif",
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap',
  },

  // Canonical hex palette. The site renders these via the HSL custom
  // properties in `src/index.css` (HSL equivalents shown inline). Emails
  // can't read CSS variables, so they consume the hex values directly.
  colors: {
    background: '#0a1410',     // hsl(160 20% 5%)   -- --background
    foreground: '#f5efe2',     // hsl(40 30% 96%)   -- --foreground
    card: '#0f1d18',           // hsl(160 18% 8%)   -- --card
    cardBorder: '#1a2e26',     // hsl(160 15% 16%)  -- --border
    primary: '#28b87a',        // hsl(158 64% 42%)  -- --primary  (emerald)
    primaryHex: '#1ea672',     // press / on-dark equivalent used in emails
    primaryForeground: '#0a1410',
    accent: '#e8c878',         // hsl(42 78% 60%)   -- --accent   (gold)
    muted: '#7d8a85',          // hsl(160 8% 62%)   -- --muted-foreground
    subtle: '#c8d3ce',         // softer body text on dark
    faint: '#5f6c67',          // footer / signoff
  },

  radius: '14px', // matches --radius (0.75rem) rounded up for email cards
} as const

/**
 * Email-specific brand block. The Deno edge-function brand file
 * (`supabase/functions/_shared/email-templates/brand.ts`) re-exports this
 * exact object so the auth emails stay in lockstep with the portal.
 */
export const BYF_EMAIL_BRAND = {
  fontsHref: BYF_BRAND.fonts.fontsHref,
  main: {
    backgroundColor: '#ffffff',
    fontFamily: BYF_BRAND.fonts.body,
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  },
  outerContainer: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  brandRow: { textAlign: 'center' as const, marginBottom: '20px' },
  brandMark: {
    fontFamily: BYF_BRAND.fonts.display,
    fontSize: '13px',
    fontWeight: 500 as const,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: BYF_BRAND.colors.background,
    margin: 0,
  },
  card: {
    backgroundColor: BYF_BRAND.colors.card,
    borderRadius: BYF_BRAND.radius,
    padding: '40px 36px',
    border: `1px solid ${BYF_BRAND.colors.cardBorder}`,
  },
  h1: {
    fontFamily: BYF_BRAND.fonts.display,
    fontSize: '28px',
    fontWeight: 600 as const,
    letterSpacing: '-0.02em',
    lineHeight: '1.25',
    color: BYF_BRAND.colors.foreground,
    margin: '0 0 18px',
  },
  text: {
    fontFamily: BYF_BRAND.fonts.body,
    fontSize: '15px',
    lineHeight: '1.65',
    color: BYF_BRAND.colors.subtle,
    margin: '0 0 26px',
  },
  buttonWrapper: { textAlign: 'center' as const, margin: '8px 0 28px' },
  button: {
    backgroundColor: BYF_BRAND.colors.primaryHex,
    color: BYF_BRAND.colors.primaryForeground,
    fontFamily: BYF_BRAND.fonts.body,
    fontSize: '15px',
    fontWeight: 600 as const,
    letterSpacing: '0.01em',
    borderRadius: '10px',
    padding: '15px 32px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  smallNote: {
    fontFamily: BYF_BRAND.fonts.body,
    fontSize: '12px',
    lineHeight: '1.6',
    color: BYF_BRAND.colors.muted,
    margin: '0 0 24px',
    wordBreak: 'break-all' as const,
  },
  inlineLink: { color: BYF_BRAND.colors.accent, textDecoration: 'none' },
  footer: {
    fontFamily: BYF_BRAND.fonts.body,
    fontSize: '12px',
    lineHeight: '1.55',
    color: BYF_BRAND.colors.muted,
    margin: '24px 0 0',
    paddingTop: '20px',
    borderTop: `1px solid ${BYF_BRAND.colors.cardBorder}`,
  },
  signOff: {
    fontFamily: BYF_BRAND.fonts.body,
    fontSize: '11px',
    lineHeight: '1.6',
    color: BYF_BRAND.colors.faint,
    textAlign: 'center' as const,
    margin: '24px 0 0',
  },
  signOffLink: { color: BYF_BRAND.colors.muted, textDecoration: 'none' },
  code: {
    fontFamily: BYF_BRAND.fonts.display,
    fontSize: '32px',
    fontWeight: 600 as const,
    letterSpacing: '0.32em',
    color: BYF_BRAND.colors.accent,
    textAlign: 'center' as const,
    margin: '0 0 28px',
  },
}
