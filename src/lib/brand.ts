/**
 * BYF brand tokens for the portal and marketing site.
 *
 * Re-exports the canonical brand config from
 * `supabase/functions/_shared/email-templates/brand.ts` so the portal UI
 * and the auth emails always use the exact same values.
 *
 * Edit the canonical file, not this one.
 */

export { BYF, brand as emailBrand } from '../../supabase/functions/_shared/email-templates/brand'
