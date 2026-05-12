# Migration Notes — Vite → Next.js 16 (May 2026)

## Pinned dependency versions

These packages are intentionally NOT on latest. Do not upgrade without testing.

- `react-day-picker` pinned to `8.10.1` — v10 changed the Calendar API
- `recharts` pinned to `2.15.4` — v3 changed the chart API
- `react-resizable-panels` pinned to `2.1.9` — v4 changed the Resizable API
- `vaul` pinned to `0.9.9` — v1 changed the Drawer API
- `lucide-react` pinned to `0.462.0` — v1.x removed social media icons (Instagram, Twitter, LinkedIn)
- `zod` pinned to `3.25.76` — v4 renamed `.errors` to `.issues`

## Architectural decisions

- **brand.ts duplicated** — `nextjs-migration/src/lib/brand.ts` mirrors `supabase/functions/_shared/email-templates/brand.ts`. Next.js refuses imports from outside the project root. Update BOTH files when changing brand tokens (colors, fonts, spacing).

- **Lucide icons in Services** — Server → Client Component prop limitation requires icon names as strings, not function references. See `src/app/services/page.tsx` and `src/components/ui/services-card.tsx` for the ICON_MAP pattern. Use this pattern for any other icon-as-prop server→client handoff.

- **Supabase client compatibility shim** — `src/integrations/supabase/client.ts` re-exports a singleton browser client so the original components' imports still work. The "proper" clients are at `src/lib/supabase/{client,server,middleware}.ts`. New code should import from `@/lib/supabase/client` (or `/server` for server components), not the shim.

- **`useSearchParams` requires Suspense** — wrap any `useSearchParams()` call in a `<Suspense>` boundary or it'll break the build. See `app/unsubscribe/page.tsx` for the pattern.

## Known gaps still to address

- Missing pages from original app not yet ported: `/privacy`, `/terms`, `/cookies`, `/support`, `/analyze`
- Lovable email gateway dependency in `notify-submission` and `create-calendar-event` edge functions (will break when Lovable subscription is cancelled — needs Resend + Google Calendar direct integration)
- Images use `.src` extraction instead of `next/image` component (working but not optimized — see Hero.tsx, Work.tsx)
- `ServiceMatch.tsx` uses destructured key pattern instead of fixing the underlying `Service` interface conflict