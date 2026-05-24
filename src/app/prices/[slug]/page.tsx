import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  DollarSign,
  TrendingDown,
  Lightbulb,
  FileText,
  AlertCircle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CTAButton } from "@/components/cta-button"
import { procedures } from "@/data/procedures"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Returns a percentage width (10-100) for a price bar relative to the max. */
function barWidth(value: number, max: number): number {
  return Math.max(10, Math.round((value / max) * 100))
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const procedure = procedures.find((p) => p.slug === slug)
  if (!procedure) return { title: "Procedure Not Found" }

  return {
    title: `${procedure.name} Cost & Fair Price — BillFight`,
    description: `${procedure.name} costs ${formatCurrency(procedure.averageCostUninsured)} on average without insurance. Medicare pays ${formatCurrency(procedure.medicareRate)}. See the fair price and negotiation tips.`,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const procedure = procedures.find((p) => p.slug === slug)
  if (!procedure) notFound()

  const maxCost = procedure.averageCostUninsured

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {procedure.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            {procedure.description}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Price Comparison Visual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-[#0d9488]" />
              Price Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Uninsured */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-600">
                  Average Cost (Uninsured)
                </span>
                <span className="text-lg font-bold text-[#f43f5e]">
                  {formatCurrency(procedure.averageCostUninsured)}
                </span>
              </div>
              <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#f43f5e]"
                  style={{
                    width: `${barWidth(procedure.averageCostUninsured, maxCost)}%`,
                  }}
                />
              </div>
            </div>

            {/* Insured */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-600">
                  Average Cost (Insured)
                </span>
                <span className="text-lg font-bold text-gray-700">
                  {formatCurrency(procedure.averageCostInsured)}
                </span>
              </div>
              <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-400"
                  style={{
                    width: `${barWidth(procedure.averageCostInsured, maxCost)}%`,
                  }}
                />
              </div>
            </div>

            {/* Fair Price Range */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-600">
                  Fair Price Range
                </span>
                <span className="text-lg font-bold text-[#0d9488]">
                  {formatCurrency(procedure.fairPriceMin)} &ndash;{" "}
                  {formatCurrency(procedure.fairPriceMax)}
                </span>
              </div>
              <div className="h-4 rounded-full bg-gray-100 overflow-hidden relative">
                <div
                  className="h-full absolute rounded-full bg-[#0d9488]/30"
                  style={{
                    left: `${barWidth(procedure.fairPriceMin, maxCost)}%`,
                    width: `${barWidth(procedure.fairPriceMax, maxCost) - barWidth(procedure.fairPriceMin, maxCost)}%`,
                  }}
                />
                <div
                  className="h-full rounded-full bg-[#0d9488]"
                  style={{
                    width: `${barWidth(procedure.fairPriceMin, maxCost)}%`,
                  }}
                />
              </div>
            </div>

            {/* Medicare */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-600">
                  Medicare Reimbursement
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatCurrency(procedure.medicareRate)}
                </span>
              </div>
              <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{
                    width: `${barWidth(procedure.medicareRate, maxCost)}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#0d9488]" />
              Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <p className="text-sm text-gray-500">
                  Average Cost (Insured)
                </p>
                <p className="mt-0.5 text-xl font-semibold text-gray-900">
                  {formatCurrency(procedure.averageCostInsured)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Average Cost (Uninsured)
                </p>
                <p className="mt-0.5 text-xl font-semibold text-[#f43f5e]">
                  {formatCurrency(procedure.averageCostUninsured)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Medicare Reimbursement Rate
                </p>
                <p className="mt-0.5 text-xl font-semibold text-emerald-700">
                  {formatCurrency(procedure.medicareRate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fair Price Range</p>
                <p className="mt-0.5 text-xl font-semibold text-[#0d9488]">
                  {formatCurrency(procedure.fairPriceMin)} &ndash;{" "}
                  {formatCurrency(procedure.fairPriceMax)}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Common CPT Codes
              </p>
              <div className="flex flex-wrap gap-2">
                {procedure.commonCptCodes.map((code) => (
                  <Badge key={code} variant="outline" className="font-mono">
                    {code}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Negotiation Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Negotiation Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {procedure.negotiationTips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-[#0d9488] mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="rounded-lg bg-[#f43f5e]/5 border border-[#f43f5e]/20 p-8 text-center">
          <FileText className="h-8 w-8 text-[#f43f5e] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Were you overcharged for a {procedure.name.toLowerCase()}?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We generate a personalized negotiation letter citing Medicare rates,
            fair-price benchmarks, and the exact CPT codes for your procedure.
          </p>
          <CTAButton href="/fight" variant="accent" size="lg">
            Generate Your Negotiation Letter — $49
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
