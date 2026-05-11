/**
 * Build Your Footprint (BYF) brand tokens, single source of truth.
 *
 * This file is the canonical brand config and is consumed by BOTH:
 *   1. Auth email templates (Deno edge functions in this folder)
 *   2. The portal / marketing site, via `src/lib/brand.ts` which re-exports
 *      these tokens (Vite imports from here directly).
 *
 * It lives inside `supabase/functions/_shared/` so the edge-function deploy
 * bundle can include it. Pure ES exports, no Deno or npm imports, so it is
 * safe to import from Vite/React as well.
 *
 * If you change a color, font, or copy value here you must also update the
 * matching HSL value in `src/index.css` (HSL equivalents shown inline).
 */

export const BYF = {
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

export const brand = {
  fontsHref: BYF.fonts.fontsHref,
  main: {
    backgroundColor: '#ffffff',
    fontFamily: BYF.fonts.body,
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
    fontFamily: BYF.fonts.display,
    fontSize: '13px',
    fontWeight: 500 as const,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: BYF.colors.background,
    margin: 0,
  },
  card: {
    backgroundColor: BYF.colors.card,
    borderRadius: BYF.radius,
    padding: '40px 36px',
    border: `1px solid ${BYF.colors.cardBorder}`,
  },
  h1: {
    fontFamily: BYF.fonts.display,
    fontSize: '28px',
    fontWeight: 600 as const,
    letterSpacing: '-0.02em',
    lineHeight: '1.25',
    color: BYF.colors.foreground,
    margin: '0 0 18px',
  },
  text: {
    fontFamily: BYF.fonts.body,
    fontSize: '15px',
    lineHeight: '1.65',
    color: BYF.colors.subtle,
    margin: '0 0 26px',
  },
  buttonWrapper: { textAlign: 'center' as const, margin: '8px 0 28px' },
  button: {
    backgroundColor: BYF.colors.primaryHex,
    color: BYF.colors.primaryForeground,
    fontFamily: BYF.fonts.body,
    fontSize: '15px',
    fontWeight: 600 as const,
    letterSpacing: '0.01em',
    borderRadius: '10px',
    padding: '15px 32px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  smallNote: {
    fontFamily: BYF.fonts.body,
    fontSize: '12px',
    lineHeight: '1.6',
    color: BYF.colors.muted,
    margin: '0 0 24px',
    wordBreak: 'break-all' as const,
  },
  inlineLink: { color: BYF.colors.accent, textDecoration: 'none' },
  footer: {
    fontFamily: BYF.fonts.body,
    fontSize: '12px',
    lineHeight: '1.55',
    color: BYF.colors.muted,
    margin: '24px 0 0',
    paddingTop: '20px',
    borderTop: `1px solid ${BYF.colors.cardBorder}`,
  },
  signOff: {
    fontFamily: BYF.fonts.body,
    fontSize: '11px',
    lineHeight: '1.6',
    color: BYF.colors.faint,
    textAlign: 'center' as const,
    margin: '24px 0 0',
  },
  signOffLink: { color: BYF.colors.muted, textDecoration: 'none' },
  code: {
    fontFamily: BYF.fonts.display,
    fontSize: '32px',
    fontWeight: 600 as const,
    letterSpacing: '0.32em',
    color: BYF.colors.accent,
    textAlign: 'center' as const,
    margin: '0 0 28px',
  },
}
