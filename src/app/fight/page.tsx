"use client"

import { useState } from "react"
import {
  FileSearch,
  TrendingDown,
  Heart,
  Calendar,
  Package,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Mail,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProductKey =
  | "itemized"
  | "negotiation"
  | "hardship"
  | "payment_plan"
  | "bundle"

interface FormData {
  product: ProductKey | ""
  hospitalName: string
  hospitalAddress: string
  totalAmount: string
  dateOfService: string
  procedure: string
  accountNumber: string
  insuranceStatus: string
  affordableAmount: string
  income: string
  householdSize: string
  employmentStatus: string
  fullName: string
  mailingAddress: string
}

type GenerationResult =
  | { type: "bundle"; letters: Record<string, string> }
  | { type: string; letter: string }

// ---------------------------------------------------------------------------
// Product definitions
// ---------------------------------------------------------------------------

const PRODUCTS = [
  {
    key: "itemized" as const,
    name: "Itemized Bill Request",
    price: "$19",
    icon: FileSearch,
    description: "Get a line-by-line breakdown of every charge on your bill",
  },
  {
    key: "negotiation" as const,
    name: "Negotiate the Price",
    price: "$49",
    icon: TrendingDown,
    description:
      "Professional negotiation letter citing Medicare rates and fair pricing",
  },
  {
    key: "hardship" as const,
    name: "Apply for Hardship/Charity Care",
    price: "$49",
    icon: Heart,
    description:
      "Financial hardship application referencing IRS 501(r) obligations",
  },
  {
    key: "payment_plan" as const,
    name: "Set Up Payment Plan",
    price: "$29",
    icon: Calendar,
    description: "Propose affordable monthly payments with interest-free terms",
  },
  {
    key: "bundle" as const,
    name: "Complete Kit — All Documents",
    price: "$99",
    icon: Package,
    description:
      "All four letters plus follow-up templates to maximize your savings",
  },
]

const INSURANCE_OPTIONS = [
  { value: "denied", label: "Insured — claim was denied" },
  { value: "remaining", label: "Insured — this is my remaining portion" },
  { value: "uninsured", label: "Uninsured" },
  { value: "underinsured", label: "Underinsured" },
]

const INCOME_RANGES = [
  "Under $20,000",
  "$20,000–$35,000",
  "$35,000–$50,000",
  "$50,000–$75,000",
  "$75,000–$100,000",
  "Over $100,000",
]

const EMPLOYMENT_OPTIONS = [
  "Employed full-time",
  "Employed part-time",
  "Unemployed",
  "Self-employed",
  "Disabled",
  "Retired",
  "Student",
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSteps(product: ProductKey | ""): string[] {
  const steps = [
    "What do you need?",
    "Hospital / Provider Info",
    "Bill Details",
    "Insurance Status",
  ]
  if (product === "negotiation" || product === "payment_plan") {
    steps.push("Counter-offer")
  }
  if (product === "hardship") {
    steps.push("Financial Info")
  }
  steps.push("Your Information", "Review & Submit")
  return steps
}

function priceForProduct(key: ProductKey): number {
  const map: Record<ProductKey, number> = {
    itemized: 19,
    negotiation: 49,
    hardship: 49,
    payment_plan: 29,
    bundle: 99,
  }
  return map[key]
}

const LETTER_LABELS: Record<string, string> = {
  itemized: "Itemized Bill Request",
  negotiation: "Negotiation Letter",
  hardship: "Financial Hardship Application",
  payment_plan: "Payment Plan Letter",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FightPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    product: "",
    hospitalName: "",
    hospitalAddress: "",
    totalAmount: "",
    dateOfService: "",
    procedure: "",
    accountNumber: "",
    insuranceStatus: "",
    affordableAmount: "",
    income: "",
    householdSize: "",
    employmentStatus: "",
    fullName: "",
    mailingAddress: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [submitError, setSubmitError] = useState("")
  const [copied, setCopied] = useState(false)

  const steps = getSteps(form.product)
  const totalSteps = steps.length
  const isReviewStep = step === totalSteps - 1

  // ---- field updater ----
  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  // ---- validation ----
  function validate(): boolean {
    const errs: Record<string, string> = {}
    const currentStepName = steps[step]

    if (currentStepName === "What do you need?" && !form.product) {
      errs.product = "Please select a product"
    }
    if (currentStepName === "Hospital / Provider Info") {
      if (!form.hospitalName.trim())
        errs.hospitalName = "Hospital name is required"
    }
    if (currentStepName === "Bill Details") {
      if (!form.totalAmount || Number(form.totalAmount) <= 0)
        errs.totalAmount = "Enter a valid amount"
      if (!form.dateOfService) errs.dateOfService = "Date of service is required"
    }
    if (currentStepName === "Insurance Status" && !form.insuranceStatus) {
      errs.insuranceStatus = "Select your insurance status"
    }
    if (currentStepName === "Counter-offer") {
      if (!form.affordableAmount || Number(form.affordableAmount) <= 0)
        errs.affordableAmount = "Enter a valid amount"
    }
    if (currentStepName === "Financial Info") {
      if (!form.income) errs.income = "Select your income range"
      if (!form.householdSize || Number(form.householdSize) <= 0)
        errs.householdSize = "Enter household size"
      if (!form.employmentStatus)
        errs.employmentStatus = "Select employment status"
    }
    if (currentStepName === "Your Information") {
      if (!form.fullName.trim()) errs.fullName = "Full name is required"
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ---- navigation ----
  function next() {
    if (!validate()) return
    setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  // ---- submission ----
  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError("")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          letterType: form.product,
          hospitalName: form.hospitalName,
          hospitalAddress: form.hospitalAddress,
          patientName: form.fullName,
          patientAddress: form.mailingAddress,
          totalAmount: Number(form.totalAmount),
          dateOfService: form.dateOfService,
          procedure: form.procedure,
          accountNumber: form.accountNumber,
          insuranceStatus:
            INSURANCE_OPTIONS.find((o) => o.value === form.insuranceStatus)
              ?.label ?? form.insuranceStatus,
          affordableAmount: form.affordableAmount
            ? Number(form.affordableAmount)
            : undefined,
          income: form.income || undefined,
          householdSize: form.householdSize
            ? Number(form.householdSize)
            : undefined,
          employmentStatus: form.employmentStatus || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? "Generation failed")
      }

      const data = await res.json()
      setResult(data)
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // ---- copy ----
  async function copyLetter(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ---- calculated suggestion ----
  const suggestedMin = form.totalAmount
    ? Math.round(Number(form.totalAmount) * 0.4)
    : 0
  const suggestedMax = form.totalAmount
    ? Math.round(Number(form.totalAmount) * 0.6)
    : 0

  // ---- price helpers ----
  const productPrice = form.product ? priceForProduct(form.product) : 0

  // -----------------------------------------------------------------------
  // If result is available, show result view
  // -----------------------------------------------------------------------
  if (result) {
    const letters =
      result.type === "bundle"
        ? Object.entries((result as { type: "bundle"; letters: Record<string, string> }).letters)
        : [[result.type, (result as { type: string; letter: string }).letter] as const]

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-2">
          Your Documents Are Ready
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Review your personalized letter{letters.length > 1 ? "s" : ""} below.
        </p>

        <div className="space-y-8">
          {letters.map(([type, text]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle>
                  {LETTER_LABELS[type as string] ?? type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {text as string}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyLetter(text as string)}
                  >
                    {copied ? (
                      <Check className="size-4" data-icon="inline-start" />
                    ) : (
                      <Copy className="size-4" data-icon="inline-start" />
                    )}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                  <Button size="sm">
                    <Download className="size-4" data-icon="inline-start" />
                    Download PDF &mdash; ${productPrice}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="size-4" data-icon="inline-start" />
                    Send via Certified Mail &mdash; ${productPrice} + $4.99
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------------
  if (isSubmitting) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <Loader2 className="mx-auto mb-4 size-10 animate-spin text-teal-600" />
        <h2 className="text-xl font-semibold mb-2">
          Generating your personalized documents&hellip;
        </h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your situation and drafting letters that cite
          relevant laws, Medicare rates, and hospital-specific obligations. This
          may take 15&ndash;30 seconds.
        </p>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Multi-step form
  // -----------------------------------------------------------------------
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-2">
        Fight Your Medical Bill
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Answer a few questions and we&rsquo;ll generate the right letters for
        you.
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Step {step + 1} of {totalSteps}
          </span>
          <span>{steps[step]}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-teal-600 transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{steps[step]}</CardTitle>
          {step === 0 && (
            <CardDescription>
              Choose the document that fits your situation.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {/* ---- Step 1: Product Selection ---- */}
          {steps[step] === "What do you need?" && (
            <div className="grid gap-3">
              {PRODUCTS.map((p) => {
                const Icon = p.icon
                const selected = form.product === p.key
                return (
                  <button
                    type="button"
                    key={p.key}
                    onClick={() => update("product", p.key)}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-colors",
                      selected
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950/30"
                        : "border-border hover:border-teal-300 hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg",
                        selected
                          ? "bg-teal-600 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{p.name}</span>
                        <span className="ml-auto shrink-0 font-semibold text-teal-600">
                          {p.price}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-teal-600 bg-teal-600"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {selected && <Check className="size-3 text-white" />}
                    </div>
                  </button>
                )
              })}
              {errors.product && (
                <p className="text-sm text-destructive">{errors.product}</p>
              )}
            </div>
          )}

          {/* ---- Step 2: Hospital Info ---- */}
          {steps[step] === "Hospital / Provider Info" && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">
                  Hospital / Provider Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="hospitalName"
                  placeholder="e.g. St. Mary's Medical Center"
                  value={form.hospitalName}
                  onChange={(e) => update("hospitalName", e.target.value)}
                  aria-invalid={!!errors.hospitalName}
                />
                {errors.hospitalName && (
                  <p className="text-sm text-destructive">
                    {errors.hospitalName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalAddress">
                  Billing Department Address
                </Label>
                <Textarea
                  id="hospitalAddress"
                  placeholder="123 Medical Dr, Suite 100&#10;City, State ZIP"
                  value={form.hospitalAddress}
                  onChange={(e) => update("hospitalAddress", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* ---- Step 3: Bill Details ---- */}
          {steps[step] === "Bill Details" && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmount">
                  Total Amount Billed <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="totalAmount"
                    type="number"
                    min={0}
                    step="0.01"
                    className="pl-7"
                    placeholder="10,000"
                    value={form.totalAmount}
                    onChange={(e) => update("totalAmount", e.target.value)}
                    aria-invalid={!!errors.totalAmount}
                  />
                </div>
                {errors.totalAmount && (
                  <p className="text-sm text-destructive">
                    {errors.totalAmount}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfService">
                  Date of Service <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dateOfService"
                  type="date"
                  value={form.dateOfService}
                  onChange={(e) => update("dateOfService", e.target.value)}
                  aria-invalid={!!errors.dateOfService}
                />
                {errors.dateOfService && (
                  <p className="text-sm text-destructive">
                    {errors.dateOfService}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="procedure">
                  Procedure or Diagnosis Description
                </Label>
                <Input
                  id="procedure"
                  placeholder="e.g. Appendectomy, ER visit, MRI"
                  value={form.procedure}
                  onChange={(e) => update("procedure", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account / Reference Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="From your billing statement"
                  value={form.accountNumber}
                  onChange={(e) => update("accountNumber", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ---- Step 4: Insurance Status ---- */}
          {steps[step] === "Insurance Status" && (
            <div className="grid gap-3">
              {INSURANCE_OPTIONS.map((opt) => {
                const selected = form.insuranceStatus === opt.value
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => update("insuranceStatus", opt.value)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950/30"
                        : "border-border hover:border-teal-300 hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-teal-600 bg-teal-600"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {selected && <Check className="size-3 text-white" />}
                    </div>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                )
              })}
              {errors.insuranceStatus && (
                <p className="text-sm text-destructive">
                  {errors.insuranceStatus}
                </p>
              )}
            </div>
          )}

          {/* ---- Step 5: Counter-offer ---- */}
          {steps[step] === "Counter-offer" && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="affordableAmount">
                  What can you afford to pay?{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="affordableAmount"
                    type="number"
                    min={0}
                    step="0.01"
                    className="pl-7"
                    placeholder={
                      suggestedMin > 0
                        ? `${suggestedMin.toLocaleString()}`
                        : "4,000"
                    }
                    value={form.affordableAmount}
                    onChange={(e) => update("affordableAmount", e.target.value)}
                    aria-invalid={!!errors.affordableAmount}
                  />
                </div>
                {errors.affordableAmount && (
                  <p className="text-sm text-destructive">
                    {errors.affordableAmount}
                  </p>
                )}
              </div>

              {Number(form.totalAmount) > 0 && (
                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-800 dark:bg-teal-950/30">
                  <p className="text-sm font-medium text-teal-800 dark:text-teal-300 mb-1">
                    Suggested range: ${suggestedMin.toLocaleString()} &ndash; $
                    {suggestedMax.toLocaleString()}
                  </p>
                  <p className="text-sm text-teal-700 dark:text-teal-400">
                    Tip: Medicare typically reimburses 40&ndash;60% of billed
                    charges. For a $
                    {Number(form.totalAmount).toLocaleString()} bill, offering $
                    {suggestedMin.toLocaleString()}&ndash;$
                    {suggestedMax.toLocaleString()} is often reasonable.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ---- Step 6: Financial Info (hardship) ---- */}
          {steps[step] === "Financial Info" && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">
                  Annual Household Income{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.income}
                  onValueChange={(val) => update("income", val as string)}
                >
                  <SelectTrigger className="w-full" id="income">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCOME_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.income && (
                  <p className="text-sm text-destructive">{errors.income}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="householdSize">
                  Household Size <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="householdSize"
                  type="number"
                  min={1}
                  max={20}
                  placeholder="e.g. 3"
                  value={form.householdSize}
                  onChange={(e) => update("householdSize", e.target.value)}
                  aria-invalid={!!errors.householdSize}
                />
                {errors.householdSize && (
                  <p className="text-sm text-destructive">
                    {errors.householdSize}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">
                  Employment Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.employmentStatus}
                  onValueChange={(val) =>
                    update("employmentStatus", val as string)
                  }
                >
                  <SelectTrigger className="w-full" id="employmentStatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employmentStatus && (
                  <p className="text-sm text-destructive">
                    {errors.employmentStatus}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ---- Step 7: Your Information ---- */}
          {steps[step] === "Your Information" && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailingAddress">Mailing Address</Label>
                <Textarea
                  id="mailingAddress"
                  placeholder="123 Main St&#10;City, State ZIP"
                  value={form.mailingAddress}
                  onChange={(e) => update("mailingAddress", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* ---- Review Step ---- */}
          {isReviewStep && (
            <div className="space-y-4">
              <ReviewRow
                label="Product"
                value={
                  PRODUCTS.find((p) => p.key === form.product)?.name ?? ""
                }
              />
              <ReviewRow label="Hospital" value={form.hospitalName} />
              {form.hospitalAddress && (
                <ReviewRow
                  label="Billing Address"
                  value={form.hospitalAddress}
                />
              )}
              <ReviewRow
                label="Amount Billed"
                value={`$${Number(form.totalAmount).toLocaleString()}`}
              />
              <ReviewRow label="Date of Service" value={form.dateOfService} />
              {form.procedure && (
                <ReviewRow label="Procedure" value={form.procedure} />
              )}
              {form.accountNumber && (
                <ReviewRow label="Account #" value={form.accountNumber} />
              )}
              <ReviewRow
                label="Insurance"
                value={
                  INSURANCE_OPTIONS.find(
                    (o) => o.value === form.insuranceStatus
                  )?.label ?? ""
                }
              />
              {form.affordableAmount && (
                <ReviewRow
                  label={
                    form.product === "payment_plan"
                      ? "Monthly Payment"
                      : "Counter-offer"
                  }
                  value={`$${Number(form.affordableAmount).toLocaleString()}`}
                />
              )}
              {form.income && (
                <ReviewRow label="Income" value={form.income} />
              )}
              {form.householdSize && (
                <ReviewRow label="Household Size" value={form.householdSize} />
              )}
              {form.employmentStatus && (
                <ReviewRow
                  label="Employment"
                  value={form.employmentStatus}
                />
              )}
              <ReviewRow label="Name" value={form.fullName} />
              {form.mailingAddress && (
                <ReviewRow label="Address" value={form.mailingAddress} />
              )}

              {submitError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {submitError}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={back}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back
        </Button>

        {isReviewStep ? (
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2
                className="size-4 animate-spin"
                data-icon="inline-start"
              />
            ) : (
              <Check className="size-4" data-icon="inline-start" />
            )}
            Generate My Documents
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={next}
          >
            Next
            <ArrowRight className="size-4" data-icon="inline-end" />
          </Button>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Review row helper
// ---------------------------------------------------------------------------

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-2 last:border-0">
      <span className="text-sm font-medium text-muted-foreground shrink-0">
        {label}
      </span>
      <span className="text-sm text-right whitespace-pre-wrap">{value}</span>
    </div>
  )
}
