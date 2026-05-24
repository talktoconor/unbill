import {
  FileSearch,
  TrendingDown,
  Heart,
  Calendar,
  Package,
  CheckCircle2,
  Shield,
  Check,
  X,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CTAButton } from "@/components/cta-button"

const products = [
  {
    name: "Itemized Bill Request",
    price: "$19",
    icon: FileSearch,
    popular: false,
    features: [
      "Formal legal request letter",
      "Cites federal and state transparency laws",
      "Requests all CPT/HCPCS codes",
      "Sets 30-day response deadline",
      "Customized to your hospital",
      "PDF download + certified mail option",
    ],
    comparison: {
      documents: "1 letter",
      medicare: false,
      hospitalSpecific: true,
      certifiedMail: true,
      followUp: false,
    },
  },
  {
    name: "Negotiation Letter",
    price: "$49",
    icon: TrendingDown,
    popular: true,
    features: [
      "Professional negotiation letter",
      "Cites Medicare reimbursement rates",
      "References fair market pricing data",
      "Specific counter-offer amount",
      "Customized to your procedure",
      "PDF download + certified mail option",
    ],
    comparison: {
      documents: "1 letter",
      medicare: true,
      hospitalSpecific: true,
      certifiedMail: true,
      followUp: false,
    },
  },
  {
    name: "Hardship Application",
    price: "$49",
    icon: Heart,
    popular: false,
    features: [
      "Financial hardship letter",
      "Charity care application",
      "Cites hospital's 501(r) obligations",
      "References Federal Poverty Level",
      "Income-based eligibility assessment",
      "PDF download + certified mail option",
    ],
    comparison: {
      documents: "2 documents",
      medicare: false,
      hospitalSpecific: true,
      certifiedMail: true,
      followUp: false,
    },
  },
  {
    name: "Payment Plan Letter",
    price: "$29",
    icon: Calendar,
    popular: false,
    features: [
      "Payment plan proposal",
      "Interest-free terms request",
      "Collections prevention language",
      "Flexible monthly amount",
      "Customized to your situation",
      "PDF download + certified mail option",
    ],
    comparison: {
      documents: "1 letter",
      medicare: false,
      hospitalSpecific: true,
      certifiedMail: true,
      followUp: false,
    },
  },
]

const bundle = {
  name: "Complete Kit",
  price: "$99",
  originalPrice: "$147",
  savings: "$48",
  icon: Package,
  features: [
    "All four documents",
    "Follow-up letter templates",
    "Medical billing dispute FAQ",
    "Priority document generation",
    "Certified mail for all letters",
    "PDF download + email delivery",
  ],
  comparison: {
    documents: "All 4 + follow-ups",
    medicare: true,
    hospitalSpecific: true,
    certifiedMail: true,
    followUp: true,
  },
}

const comparisonRows = [
  { label: "Documents Included", key: "documents" as const },
  { label: "Medicare Rate Citations", key: "medicare" as const },
  { label: "Hospital-Specific", key: "hospitalSpecific" as const },
  { label: "Certified Mail Option", key: "certifiedMail" as const },
  { label: "Follow-up Templates", key: "followUp" as const },
]

function ComparisonCell({
  value,
}: {
  value: string | boolean
}) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-slate-700">{value}</span>
  }
  return value ? (
    <Check className="mx-auto h-5 w-5 text-[#0d9488]" />
  ) : (
    <X className="mx-auto h-5 w-5 text-slate-300" />
  )
}

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-white px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Billing advocates charge $100-200/hour.{" "}
            <span className="font-semibold text-[#0d9488]">
              We charge $49.
            </span>
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Individual Products */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <Card
                  key={product.name}
                  className={`relative flex flex-col ${
                    product.popular
                      ? "ring-2 ring-[#f43f5e] shadow-lg"
                      : ""
                  }`}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#f43f5e] text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-0">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488]/10">
                      <Icon className="h-5 w-5 text-[#0d9488]" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {product.price}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Separator className="my-4" />
                    <ul className="space-y-3">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0d9488]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <CTAButton
                      href="/fight"
                      variant={product.popular ? "accent" : "primary"}
                      size="md"
                      className="w-full"
                    >
                      Get Started
                    </CTAButton>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Bundle Card */}
          <div className="mt-10">
            <Card className="relative border-2 border-[#0d9488] bg-gradient-to-br from-[#0d9488]/[0.04] to-white shadow-xl">
              <CardHeader>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0d9488]/10">
                      <Package className="h-7 w-7 text-[#0d9488]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-2xl">
                          Complete Bill Fight Kit
                        </CardTitle>
                        <Badge className="bg-[#0d9488] text-white">
                          Save {bundle.savings}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1 text-base">
                        Everything you need to fight your medical bill, in one
                        package.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-500 line-through">
                        {bundle.originalPrice}
                      </p>
                      <p className="text-4xl font-bold text-slate-900">
                        {bundle.price}
                      </p>
                    </div>
                    <CTAButton href="/fight" variant="accent" size="lg">
                      Get the Kit
                    </CTAButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {bundle.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0d9488]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Compare Plans
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              See exactly what each product includes.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                    Feature
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.name}
                      className="px-4 py-4 text-center text-sm font-semibold text-slate-900"
                    >
                      {p.name}
                      <span className="block text-xs font-normal text-slate-500 mt-1">
                        {p.price}
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-4 text-center text-sm font-semibold text-[#0d9488] bg-[#0d9488]/[0.04] rounded-t-lg">
                    Complete Kit
                    <span className="block text-xs font-normal text-[#0d9488]/70 mt-1">
                      {bundle.price}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.key}
                    className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-slate-700">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td
                        key={`${p.name}-${row.key}`}
                        className="px-4 py-4 text-center"
                      >
                        <ComparisonCell value={p.comparison[row.key]} />
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center bg-[#0d9488]/[0.04]">
                      <ComparisonCell value={bundle.comparison[row.key]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Money-back Guarantee */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0d9488]/10">
            <Shield className="h-8 w-8 text-[#0d9488]" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            100% Satisfaction Guarantee
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            If you&apos;re not satisfied with your documents, we&apos;ll refund
            your purchase. No questions asked.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0d9488] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Fight Your Bill?
          </h2>
          <p className="mt-4 text-lg text-teal-100">
            Most patients save 40-60%. Your documents are generated instantly.
          </p>
          <div className="mt-10">
            <CTAButton
              href="/fight"
              variant="accent"
              size="lg"
              className="text-lg px-10 py-5"
            >
              Get Started &mdash; $49
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
