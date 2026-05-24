import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CheckCircle2, Shield, ArrowRight } from "lucide-react"
import { CTAButton } from "@/components/cta-button"

// ---------------------------------------------------------------------------
// Variant data
// ---------------------------------------------------------------------------

interface LandingVariant {
  slug: string
  headline: string
  subheadline: string
  points: { title: string; description: string }[]
  ctaText: string
}

const variants: LandingVariant[] = [
  {
    slug: "medical-bill",
    headline: "Medical Bill Too High? Negotiate It Down.",
    subheadline:
      "Hospitals charge 2-5x what Medicare pays. You have the right to push back and pay a fair price. Most patients who negotiate save 40-60% on their bills.",
    points: [
      {
        title: "Your bill is a starting offer, not a final price",
        description:
          "Hospital chargemaster rates are internal prices with no relationship to the actual cost of care. Insurance companies negotiate these down every day, and so can you.",
      },
      {
        title: "Medicare rates prove what care actually costs",
        description:
          "The federal government pays hospitals a fraction of what they charge patients. We generate letters that cite these exact rates for your specific procedures.",
      },
      {
        title: "Professional letters get results",
        description:
          "A well-crafted negotiation letter with legal citations and data carries far more weight than a phone call. Hospitals take written requests seriously.",
      },
      {
        title: "You keep 100% of the savings",
        description:
          "Billing advocates charge $100-200/hour or take 25-35% of savings. Our documents cost a fraction of that, and every dollar saved goes back in your pocket.",
      },
    ],
    ctaText: "Negotiate Your Bill Now",
  },
  {
    slug: "er",
    headline: "Surprise ER Bill? You Can Fight It.",
    subheadline:
      "Emergency room bills are the most overcharged bills in healthcare. The No Surprises Act and your right to negotiate mean you do not have to accept the first price.",
    points: [
      {
        title: "The No Surprises Act protects you",
        description:
          "If you received emergency care, out-of-network providers cannot balance-bill you. You should only pay your in-network cost-sharing amount. Many surprise ER bills violate this law.",
      },
      {
        title: "ER visits are commonly upcoded",
        description:
          "Hospitals frequently code ER visits at the highest severity level even for moderate issues. The difference between a Level 3 and Level 5 ER visit can be thousands of dollars.",
      },
      {
        title: "Facility fees can be challenged",
        description:
          "ER facility fees are separate from physician fees and are often the largest part of the bill. These fees are highly negotiable, especially when they exceed Medicare benchmarks.",
      },
      {
        title: "Act quickly to prevent collections",
        description:
          "ER bills are among the fastest to be sent to collections. Requesting an itemized bill and beginning negotiations signals engagement and buys you time.",
      },
    ],
    ctaText: "Fight Your ER Bill",
  },
  {
    slug: "uninsured",
    headline: "Uninsured? You Can Still Negotiate.",
    subheadline:
      "Being uninsured does not mean you owe the full amount. Hospitals routinely accept 20-40% of billed charges from self-pay patients. You deserve a fair price.",
    points: [
      {
        title: "Hospitals accept less from self-pay patients",
        description:
          "The prices on your bill are chargemaster rates that no insurance company actually pays. Hospitals regularly offer self-pay discounts of 40-70% because they save on administrative costs.",
      },
      {
        title: "You may qualify for free care",
        description:
          "If you were treated at a nonprofit hospital, you may qualify for charity care. Most nonprofits provide free care for patients under 200% of the Federal Poverty Level and discounts up to 400%.",
      },
      {
        title: "Good faith estimates protect you",
        description:
          "Under the No Surprises Act, providers must give uninsured patients a good faith estimate before scheduled services. If your bill exceeds the estimate by $400 or more, you can dispute it.",
      },
      {
        title: "Lump-sum offers get the biggest discounts",
        description:
          "Offering to pay a reduced amount in full and immediately is the most effective negotiation strategy for uninsured patients. Hospitals prefer guaranteed payment over collection risk.",
      },
    ],
    ctaText: "Get Your Negotiation Letter",
  },
  {
    slug: "charity-care",
    headline: "You May Qualify for Free Hospital Care.",
    subheadline:
      "Billions of dollars in charity care go unclaimed every year. Nonprofit hospitals are legally required under IRS 501(r) to offer financial assistance. You might qualify and not even know it.",
    points: [
      {
        title: "Most hospitals are nonprofits with charity care programs",
        description:
          "Roughly 60% of US hospitals are nonprofit organizations. Every one of them is required to maintain a financial assistance policy and provide free or reduced-cost care to qualifying patients.",
      },
      {
        title: "Income thresholds are higher than you think",
        description:
          "Most hospitals provide free care for patients under 200% of the Federal Poverty Level, with discounts up to 300-400% FPL. A family of four earning under $64,000 often qualifies for significant assistance.",
      },
      {
        title: "You can apply even after receiving a bill",
        description:
          "You do not need to apply before treatment. Most hospitals accept financial assistance applications for up to 240 days after the first billing statement. Some will even review bills already paid.",
      },
      {
        title: "Hospitals cannot use aggressive collection tactics first",
        description:
          "Under IRS 501(r), nonprofit hospitals must make reasonable efforts to determine charity care eligibility before sending bills to collections, filing lawsuits, or placing liens on your property.",
      },
    ],
    ctaText: "Apply for Financial Assistance",
  },
  {
    slug: "collections",
    headline: "Medical Bill in Collections? You Have Options.",
    subheadline:
      "A medical bill in collections is stressful, but recent changes to credit reporting laws and your legal rights mean the situation is more manageable than you think.",
    points: [
      {
        title: "Medical debt credit reporting has changed dramatically",
        description:
          "Paid medical debt no longer appears on credit reports. Medical debts under $500 are excluded entirely. You have a full year after a bill goes to collections before it can affect your credit.",
      },
      {
        title: "You can still negotiate in collections",
        description:
          "Collection agencies purchase debt for pennies on the dollar. They are often willing to accept 20-50% of the balance as a settlement. A lump-sum offer with a pay-for-delete agreement can resolve the issue entirely.",
      },
      {
        title: "Validate the debt before paying anything",
        description:
          "Under the Fair Debt Collection Practices Act, you can request written validation of the debt within 30 days of first contact. The collector must prove the debt is valid and that they have authority to collect it.",
      },
      {
        title: "Nonprofit hospitals may have violated the law",
        description:
          "If a nonprofit hospital sent your bill to collections without first offering financial assistance, they may have violated IRS 501(r). This gives you leverage to pull the bill back and apply for charity care.",
      },
    ],
    ctaText: "Fight Your Collections Bill",
  },
]

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return variants.map((v) => ({ variant: v.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>
}): Promise<Metadata> {
  const { variant } = await params
  const v = variants.find((v) => v.slug === variant)
  if (!v) return { title: "BillFight" }
  return {
    title: `${v.headline} | BillFight`,
    description: v.subheadline,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function LandingPage({
  params,
}: {
  params: Promise<{ variant: string }>
}) {
  const { variant } = await params
  const v = variants.find((item) => item.slug === variant)
  if (!v) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-[#0d9488]/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-[#f43f5e]/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {v.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            {v.subheadline}
          </p>
          <div className="mt-10">
            <CTAButton href="/fight" variant="accent" size="lg">
              {v.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {v.points.map((point, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d9488]">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {point.title}
                </h2>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0d9488] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Take the First Step
          </h2>
          <p className="mt-3 text-teal-100">
            Generate professional documents customized to your hospital, your
            procedure, and your financial situation. Backed by Medicare rates and
            federal law.
          </p>
          <div className="mt-8">
            <CTAButton
              href="/fight"
              variant="accent"
              size="lg"
              className="text-lg px-10 py-5"
            >
              {v.ctaText} &mdash; $49
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
