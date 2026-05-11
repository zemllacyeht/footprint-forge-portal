// Build Your Footprint (BYF) email brand tokens.
//
// SINGLE SOURCE OF TRUTH lives in `src/lib/brand.ts`. This file re-exports
// those tokens so the auth emails always match the portal. Do NOT edit the
// values here, edit `src/lib/brand.ts` instead.

import { BYF_EMAIL_BRAND, BYF_BRAND } from '../../../../src/lib/brand.ts'

export const brand = BYF_EMAIL_BRAND
export const byf = BYF_BRAND
