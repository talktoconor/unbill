"use client"

import { useState } from "react"
import {
  Calculator,
  Heart,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  MapPin,
  Search,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CTAButton } from "@/components/cta-button"
import { procedures } from "@/data/procedures"

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
]

// 2025 Federal Poverty Level guidelines (annual)
function getFPL(householdSize: number): number {
  const base = 15650
  const perPerson = 5580
  return base + perPerson * (Math.max(householdSize, 1) - 1)
}

// ---------------------------------------------------------------------------
// Fair Price Calculator
// ---------------------------------------------------------------------------

function FairPriceCalculator() {
  const [selectedProcedure, setSelectedProcedure] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [billedAmount, setBilledAmount] = useState("")
  const [showResults, setShowResults] = useState(false)

  const procedure = procedures.find((p) => p.slug === selectedProcedure)

  function handleCalculate() {
    if (procedure && zipCode.length === 5) {
      setShowResults(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488]/10">
            <Calculator className="h-5 w-5 text-[#0d9488]" />
          </div>
          <div>
            <CardTitle>Fair Price Calculator</CardTitle>
            <CardDescription>
              Compare your bill against Medicare rates and fair market prices.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select a Procedure
          </label>
          <select
            value={selectedProcedure}
            onChange={(e) => {
              setSelectedProcedure(e.target.value)
              setShowResults(false)
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
          >
            <option value="">Choose a procedure...</option>
            {procedures.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Your Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                setShowResults(false)
              }}
              placeholder="e.g. 90210"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              What Were You Billed?
            </label>
            <input
              type="text"
              value={billedAmount}
              onChange={(e) => {
                setBilledAmount(e.target.value.replace(/[^\d]/g, ""))
                setShowResults(false)
              }}
              placeholder="e.g. 5000"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!procedure || zipCode.length !== 5}
          className="w-full rounded-lg bg-[#0d9488] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f766e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Calculate Fair Price
        </button>

        {showResults && procedure && (
          <div className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">
              Price Comparison: {procedure.name}
            </h3>

            {/* Price bars */}
            <div className="space-y-3">
              <PriceBar
                label="Medicare Rate"
                amount={procedure.medicareRate}
                max={Math.max(
                  procedure.averageCostUninsured,
                  Number(billedAmount) || 0
                )}
                color="bg-emerald-500"
              />
              <PriceBar
                label="Typical Insured Price"
                amount={procedure.averageCostInsured}
                max={Math.max(
                  procedure.averageCostUninsured,
                  Number(billedAmount) || 0
                )}
                color="bg-blue-500"
              />
              <PriceBar
                label="Fair Cash Price Range"
                amount={procedure.fairPriceMin}
                amountMax={procedure.fairPriceMax}
                max={Math.max(
                  procedure.averageCostUninsured,
                  Number(billedAmount) || 0
                )}
                color="bg-[#0d9488]"
              />
              {billedAmount && (
                <PriceBar
                  label="What You Were Billed"
                  amount={Number(billedAmount)}
                  max={Math.max(
                    procedure.averageCostUninsured,
                    Number(billedAmount) || 0
                  )}
                  color="bg-[#f43f5e]"
                />
              )}
            </div>

            {billedAmount && Number(billedAmount) > procedure.medicareRate && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="text-sm text-amber-800">
                  <strong>Your bill is{" "}
                  {(Number(billedAmount) / procedure.medicareRate).toFixed(1)}x
                  the Medicare rate.</strong>{" "}
                  You have strong grounds to negotiate. A fair target would be{" "}
                  {formatCurrency(procedure.fairPriceMin)} &ndash;{" "}
                  {formatCurrency(procedure.fairPriceMax)}.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PriceBar({
  label,
  amount,
  amountMax,
  max,
  color,
}: {
  label: string
  amount: number
  amountMax?: number
  max: number
  color: string
}) {
  const width = Math.max(8, Math.round((amount / max) * 100))
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">
          {formatCurrency(amount)}
          {amountMax ? ` – ${formatCurrency(amountMax)}` : ""}
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Charity Care Eligibility Checker
// ---------------------------------------------------------------------------

function CharityCareChecker() {
  const [income, setIncome] = useState("")
  const [householdSize, setHouseholdSize] = useState("")
  const [state, setState] = useState("")
  const [showResults, setShowResults] = useState(false)

  function handleCheck() {
    if (income && householdSize && state) {
      setShowResults(true)
    }
  }

  const fpl = getFPL(Number(householdSize) || 1)
  const fplPercent =
    income && householdSize
      ? Math.round((Number(income) / fpl) * 100)
      : 0

  let eligibility: { level: string; color: string; description: string }
  if (fplPercent <= 200) {
    eligibility = {
      level: "Likely Qualifies for Free Care",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "At this income level, most nonprofit hospitals will cover 100% of your bill through their charity care program. You should apply for financial assistance immediately.",
    }
  } else if (fplPercent <= 400) {
    eligibility = {
      level: "Likely Qualifies for Reduced Costs",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description:
        "At this income level, many nonprofit hospitals offer sliding-scale discounts that could reduce your bill by 25-75%. Apply for financial assistance to find out your specific discount.",
    }
  } else {
    eligibility = {
      level: "May Not Qualify for Charity Care",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "At this income level, standard charity care may not apply. However, you can still negotiate your bill, request prompt-pay discounts, and set up interest-free payment plans. Some hospitals also have catastrophic medical expense policies for high bills.",
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488]/10">
            <Heart className="h-5 w-5 text-[#0d9488]" />
          </div>
          <div>
            <CardTitle>Charity Care Eligibility Checker</CardTitle>
            <CardDescription>
              See if you might qualify for free or reduced-cost hospital care.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Annual Household Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value.replace(/[^\d]/g, ""))
                setShowResults(false)
              }}
              placeholder="e.g. 35000"
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Household Size
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={householdSize}
              onChange={(e) => {
                setHouseholdSize(
                  e.target.value.replace(/[^\d]/g, "").slice(0, 2)
                )
                setShowResults(false)
              }}
              placeholder="e.g. 3"
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value)
                setShowResults(false)
              }}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            >
              <option value="">Select state...</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCheck}
          disabled={!income || !householdSize || !state}
          className="w-full rounded-lg bg-[#0d9488] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f766e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Eligibility
        </button>

        {showResults && (
          <div className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">
                  Federal Poverty Level ({householdSize}-person household)
                </span>
                <p className="font-semibold text-slate-900">
                  {formatCurrency(fpl)}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Your Income as % of FPL</span>
                <p className="font-semibold text-slate-900">{fplPercent}%</p>
              </div>
            </div>

            <div className={`rounded-lg border p-4 ${eligibility.color}`}>
              <p className="font-semibold">{eligibility.level}</p>
              <p className="mt-1 text-sm">{eligibility.description}</p>
            </div>

            <p className="text-xs text-slate-500">
              Note: Each hospital has different charity care thresholds and
              policies. This is an estimate based on federal poverty guidelines.
              Contact your hospital&apos;s Patient Financial Services department
              for their specific eligibility requirements.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Medical Bill Error Checker
// ---------------------------------------------------------------------------

const COMMON_ERRORS = [
  {
    id: "duplicate",
    label: "Duplicate charges",
    description:
      "The same service, supply, or medication appears more than once on your bill.",
    action:
      "Highlight the duplicate entries and request removal of the extra charges. Provide the specific line items and CPT codes in your dispute.",
  },
  {
    id: "upcoding",
    label: "Incorrect billing codes (upcoding)",
    description:
      "A routine service is coded at a higher complexity level than what was actually provided, resulting in inflated charges.",
    action:
      "Request your medical records and compare the documented level of service against the billing code. Cite the correct CPT code in your dispute letter.",
  },
  {
    id: "not-received",
    label: "Charges for services not received",
    description:
      "Your bill includes medications, supplies, or procedures that were never actually provided to you.",
    action:
      "Cross-reference your bill against your discharge summary and medical records. Request removal of any charges for services you did not receive.",
  },
  {
    id: "unbundled",
    label: "Unbundled charges",
    description:
      "Services that should be billed together under a single code are split into separate charges at a higher total cost.",
    action:
      "Research whether the individual charges should be covered by a single bundled CPT code. Reference the correct bundled code in your dispute.",
  },
  {
    id: "incorrect-info",
    label: "Incorrect patient information",
    description:
      "Errors in your name, date of birth, insurance ID, or diagnosis codes that may cause claim denials or incorrect billing.",
    action:
      "Contact the billing department to correct any errors in your personal or insurance information, then request the claim be reprocessed.",
  },
  {
    id: "or-time",
    label: "Operating room time overcharges",
    description:
      "OR time is billed beyond the actual time spent in surgery, often rounded up significantly.",
    action:
      "Request the OR log to verify actual surgical time. Dispute any time billed beyond what the records support.",
  },
  {
    id: "med-quantity",
    label: "Medication quantity errors",
    description:
      "Incorrect quantities of medications billed, including drugs that were prescribed but never administered.",
    action:
      "Compare medication charges against the medication administration record (MAR) in your medical records. Dispute any discrepancies.",
  },
  {
    id: "insurance-adjustment",
    label: "Charges after insurance adjustment errors",
    description:
      "Your bill does not correctly reflect insurance payments or contractual adjustments, resulting in overcharges to you.",
    action:
      "Compare your bill against your Explanation of Benefits (EOB) from your insurer. Contact both the provider and insurer if the amounts do not match.",
  },
]

function BillErrorChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const anyChecked = Object.values(checked).some(Boolean)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488]/10">
            <ClipboardCheck className="h-5 w-5 text-[#0d9488]" />
          </div>
          <div>
            <CardTitle>Medical Bill Error Checker</CardTitle>
            <CardDescription>
              Check your bill for common errors. Up to 80% of medical bills
              contain mistakes.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {COMMON_ERRORS.map((error) => (
          <div
            key={error.id}
            className={`rounded-lg border p-4 transition-colors ${
              checked[error.id]
                ? "border-[#f43f5e]/30 bg-[#f43f5e]/5"
                : "border-slate-200 bg-white"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!checked[error.id]}
                onChange={(e) =>
                  setChecked((prev) => ({
                    ...prev,
                    [error.id]: e.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0d9488] focus:ring-[#0d9488]"
              />
              <div>
                <p className="font-semibold text-slate-900">{error.label}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {error.description}
                </p>
                {checked[error.id] && (
                  <div className="mt-2 rounded bg-white border border-slate-200 p-3">
                    <p className="text-sm text-slate-700">
                      <strong className="text-[#0d9488]">What to do:</strong>{" "}
                      {error.action}
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}

        {anyChecked && (
          <div className="mt-6 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 p-6 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#f43f5e]" />
            <p className="mt-2 font-semibold text-slate-900">
              Found potential errors on your bill?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              The first step is getting a detailed itemized bill with CPT codes.
              We generate one for you.
            </p>
            <div className="mt-4">
              <CTAButton href="/fight" variant="accent" size="md">
                Request an Itemized Bill &mdash; $19
              </CTAButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ToolsPage() {
  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free Medical Bill Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Use these free tools to understand your bill, check your eligibility
            for financial assistance, and identify common billing errors.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <FairPriceCalculator />
          <CharityCareChecker />
          <BillErrorChecker />
        </div>
      </div>
    </div>
  )
}
