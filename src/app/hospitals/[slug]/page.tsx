import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  Phone,
  ExternalLink,
  Building2,
  MapPin,
  Heart,
  DollarSign,
  ClipboardList,
  Shield,
  CheckCircle2,
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
import { hospitals } from "@/data/hospitals"

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const hospital = hospitals.find((h) => h.slug === slug)
  if (!hospital) return { title: "Hospital Not Found" }

  return {
    title: `${hospital.name} Charity Care Policy — BillFight`,
    description: `Find out how to qualify for free or reduced-cost care at ${hospital.name}. Income thresholds, application process, and patient rights.`,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const hospital = hospitals.find((h) => h.slug === slug)
  if (!hospital) notFound()

  const applicationSteps = hospital.applicationProcess
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge
              variant={
                hospital.type === "nonprofit" ? "default" : "secondary"
              }
              className={
                hospital.type === "nonprofit"
                  ? "bg-[#0d9488] hover:bg-[#0f766e]"
                  : ""
              }
            >
              {hospital.type === "nonprofit" ? "Nonprofit" : "For-Profit"}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {hospital.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {hospital.system}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {hospital.city}, {hospital.state}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <a
                href={`tel:${hospital.billingPhone}`}
                className="underline underline-offset-2 hover:text-[#0d9488]"
              >
                {hospital.billingPhone}
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Charity Care Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#f43f5e]" />
              Charity Care Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {hospital.charityCarePolicy}
            </p>
            <Separator />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Income Eligibility
              </h3>
              <p className="text-gray-700">{hospital.incomeThreshold}</p>
            </div>
          </CardContent>
        </Card>

        {/* Financial Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#0d9488]" />
              Financial Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Tax Exemption Value
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {hospital.taxExemptionValue}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Charity Care Provided
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {hospital.charityCareProvided}
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-sm text-gray-500">
              Nonprofit hospitals receive tax exemptions in exchange for
              providing community benefits including charity care. Under IRS
              Section 501(r), they are required to have a written financial
              assistance policy and may not pursue extraordinary collection
              actions before making reasonable efforts to determine eligibility.
            </p>
          </CardContent>
        </Card>

        {/* How to Apply */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#0d9488]" />
              How to Apply
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {applicationSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0d9488] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{step}.</span>
                </li>
              ))}
            </ol>

            <Separator />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0d9488] font-medium hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Visit {hospital.name} Website
              </a>
            </div>

            <div className="rounded-lg bg-[#f43f5e]/5 border border-[#f43f5e]/20 p-6 mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Need help applying?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We generate a personalized charity care application letter with
                all the right language and legal citations to maximize your
                chances of approval.
              </p>
              <CTAButton href="/fight" variant="accent">
                Generate Your Charity Care Application — $49
              </CTAButton>
            </div>
          </CardContent>
        </Card>

        {/* Know Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#0d9488]" />
              Know Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              As a patient at {hospital.name}, you have the right to:
            </p>
            <ul className="space-y-3">
              {[
                "Receive a plain-language summary of the hospital's financial assistance policy before being billed",
                "Apply for financial assistance up to 240 days after your first billing statement",
                "Not be sent to collections or have liens placed on your property while your application is pending",
                "Receive emergency care regardless of your ability to pay, under EMTALA federal law",
                "Request an itemized bill with every charge explained in detail",
                "Dispute any charge you believe is inaccurate or unfair",
                "Be charged no more than the amounts generally billed to insured patients if you qualify for financial assistance",
                "Have your financial assistance application reviewed within a reasonable time frame",
              ].map((right, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0d9488] mt-0.5" />
                  <span className="text-gray-700">{right}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
