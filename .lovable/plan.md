## Goal

Replace the cloned `<Pricing />` block on the dedicated `/pricing` page with a polished, senior-level **Plan Finder Wizard**. The wizard asks the visitor a short series of questions, recommends a Build package + Care plan + relevant Add-ons, and routes the user directly into the existing cart flow. The pricing-card grid stays available below as the "Browse all plans" reference, but the wizard becomes the page's hero experience.

## What the user sees

```text
[Page header: Investment / Pricing]
        |
        v
[ Plan Finder Wizard ]                  <- new, fills the fold
  Step indicator (1 of 5)
  Animated step card with question + options
  Back / Next buttons, progress bar
        |
        v
[ Recommendation panel ]                <- final step
  Suggested Build + Care + Add-ons
  Price summary, "why this plan" rationale
  [Add to cart]   [View cart]   [Tweak answers]
        |
        v
[ Browse all plans (collapsed accordion) ]
  Existing <Pricing /> grid, opt-in
[ FAQs ]                                <- existing
```

## Wizard questions (5 short steps)

1. **What kind of site do you need?**  
   Single landing page · Small business (3 to 5 pages) · Content-rich (6 to 12 pages) · E-commerce or booking
2. **What is your goal?**  
   Get found locally · Generate leads · Sell online · Build credibility
3. **Brand assets ready?**  
   Logo and colors set · Logo only · Need a refresh · Starting from scratch
4. **Need ongoing marketing help?** (multi-select)  
   SEO · Social and ads · Content and photography · Just keep the site running
5. **Timeline and budget comfort?**  
   ASAP (under 2 weeks) · 2 to 4 weeks · 1 to 2 months · Flexible  
   plus a slider for monthly comfort: 19 / 59 / custom

## Recommendation logic (deterministic, transparent)

- **Build tier** scored from Q1 + Q2 + Q5
  - Single page or "ASAP" + "Get found locally" -> Core
  - Small business + Generate leads -> Launch
  - Content-rich + Build credibility, or Brand starting from scratch -> Signature
  - E-commerce / booking, or "Need a refresh" + "Sell online" -> Enterprise
- **Care plan**
  - Core or Launch -> Essential Care
  - Signature -> Growth Care
  - Enterprise -> White-Glove Care
- **Add-ons** mapped from Q3 + Q4
  - Q3 = "refresh" or "scratch" -> Brand Identity Kit
  - Q4 includes SEO -> SEO Boost
  - Q4 includes Social/ads -> Marketing Collateral
  - Q4 includes Content/photography -> Content & Photography
- Show 1 to 2 sentences explaining *why* each item was picked, tied to the user's answers.

## Cart integration

- Reuse `useCart().addItem` with the existing `id`, `name`, `price`, `category` shape used in `Pricing.tsx` (`build-core`, `care-essential`, `addon-seo-boost`, etc.) so the cart drawer, summary chips, and request flow keep working with no other changes.
- Recommendation panel buttons:
  - **Add recommended plan to cart** (adds Build + Care + selected add-ons)
  - **Open cart** (`openCart()` from `useCart`)
  - **Adjust answers** (jumps back to step 1 with current answers preserved)
- Show a small inline confirmation toast via existing `useToast`.

## Page restructure (`src/pages/PricingPage.tsx`)

- Keep `PageLayout` and `PageHeader`.
- Insert new `<PlanFinderWizard />` immediately under the header (this is what now occupies the fold).
- Replace the bare `<Pricing />` with a collapsed "Browse all packages" disclosure (using the existing shadcn `Accordion`) so power users can still scan every tier.
- Keep the existing FAQ section and "Get a custom quote" CTA at the bottom.

## New files

- `src/components/site/PlanFinderWizard.tsx`  
  Self-contained wizard. Uses local state for answers and current step, framer-motion for step transitions (already a dep), shadcn `Button`, `Progress`, `RadioGroup`/`Checkbox`, and lucide icons consistent with the site (Compass, Sparkles, Check, ArrowRight, ArrowLeft, RotateCcw).
- `src/components/site/PlanFinderWizard.recommend.ts`  
  Pure function `recommend(answers): { build, care, addons[], rationale[] }`. Easy to unit test and keeps the component lean.

## Touched files

- `src/pages/PricingPage.tsx` (mount wizard, wrap `<Pricing />` in accordion)
- `src/components/site/PlanFinderWizard.tsx` (new)
- `src/components/site/PlanFinderWizard.recommend.ts` (new)

## Design notes (matches existing site language)

- Glassmorphism card with gold gradient border for the active step, primary emerald accents for recommendations.
- `font-display` (Fraunces) for step headlines, Inter for body.
- Animated progress bar tinted with `--accent` to `--primary` gradient, mirroring the Process page rail.
- Mobile: stacked single column, large tap targets, sticky Next button at the bottom of the wizard card.
- Respects existing tokens only, no ad hoc hex values.
- No em dashes in copy.

## Out of scope

- No new database or auth work.
- No changes to `Pricing.tsx` internals or to the cart hook.
- No payment integration changes.
