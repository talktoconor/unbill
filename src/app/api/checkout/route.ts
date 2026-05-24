import { stripe, PRODUCTS, type ProductKey } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { product, email } = body as { product: string; email?: string }

    if (!product || !(product in PRODUCTS)) {
      return NextResponse.json(
        { error: "Invalid product. Valid options: " + Object.keys(PRODUCTS).join(", ") },
        { status: 400 }
      )
    }

    const productKey = product as ProductKey
    const productInfo = PRODUCTS[productKey]

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productInfo.name,
              description: productInfo.description,
            },
            unit_amount: productInfo.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/fight?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/fight?canceled=true`,
      ...(email && { customer_email: email }),
      metadata: { product: productKey },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Checkout error:", err)
    const message = err instanceof Error ? err.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
