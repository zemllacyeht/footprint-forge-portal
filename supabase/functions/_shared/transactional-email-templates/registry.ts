/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as cartRequestOwner } from './cart-request-owner.tsx'
import { template as cartRequestCustomer } from './cart-request-customer.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'cart-request-owner': cartRequestOwner,
  'cart-request-customer': cartRequestCustomer,
}
