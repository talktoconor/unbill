import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed"
    console.error("Webhook signature verification failed:", message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const product = session.metadata?.product
      const customerEmail = session.customer_email ?? session.customer_details?.email

      console.log(
        `Payment completed: product=${product}, email=${customerEmail}, session=${session.id}`
      )

      // TODO: In production, trigger PDF generation + email delivery
      // await generateAndEmailPDF(product, customerEmail)

      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
