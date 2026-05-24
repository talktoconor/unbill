import Stripe from "stripe"

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" })
  : (null as unknown as Stripe)

export const PRODUCTS = {
  itemized: {
    name: "Itemized Bill Request",
    price: 1900,
    description: "Formal request for line-by-line breakdown of all charges",
  },
  negotiation: {
    name: "Negotiation Letter",
    price: 4900,
    description: "Professional negotiation letter citing Medicare rates",
  },
  hardship: {
    name: "Financial Hardship Application",
    price: 4900,
    description: "Hardship letter + charity care application",
  },
  payment_plan: {
    name: "Payment Plan Letter",
    price: 2900,
    description: "Negotiate affordable monthly payments",
  },
  bundle: {
    name: "Complete Bill Fight Kit",
    price: 9900,
    description: "All four documents + follow-up templates",
  },
} as const

export type ProductKey = keyof typeof PRODUCTS
