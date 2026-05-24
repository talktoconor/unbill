import {
  FileSearch,
  TrendingDown,
  Heart,
  Calendar,
  Package,
  ClipboardList,
  Sparkles,
  Send,
  Shield,
  CheckCircle2,
  Quote,
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { CTAButton } from "@/components/cta-button"

const products = [
  {
    name: "Itemized Bill Request",
    price: "$19",
    description:
      "Find the errors. Hospitals are legally required to provide line-by-line billing. Errors are found 30-80% of the time.",
    icon: FileSearch,
  },
  {
    name: "Price Negotiation Letter",
    price: "$49",
    description:
      "Demand a fair price backed by Medicare rates and market data. Our letters cite the exact rates hospitals accept from insurance.",
    icon: TrendingDown,
    popular: true,
  },
  {
    name: "Financial Hardship Application",
    price: "$49",
    description:
      "Qualify for free or reduced care. Most nonprofit hospitals are required to offer charity care under IRS 501(r).",
    icon: Heart,
  },
  {
    name: "Payment Plan Letter",
    price: "$29",
    description:
      "Get affordable monthly terms. Prevent collections and negotiate interest-free payments as low as $25/month.",
    icon: Calendar,
  },
]

const stats = [
  { value: "100M+", label: "Americans have medical debt" },
  { value: "30-80%", label: "of medical bills contain errors" },
  { value: "40-60%", label: "average negotiated reduction" },
  { value: "501(r)", label: "Nonprofit hospitals MUST offer charity care" },
]

const steps = [
  {
    number: "1",
    title: "Tell Us About Your Bill",
    description:
      "Answer a few questions about your hospital, procedure, and situation.",
    icon: ClipboardList,
  },
  {
    number: "2",
    title: "We Generate Your Documents",
    description:
      "Our AI creates professional letters customized to your specific hospital’s policies and citing exact Medicare rates.",
    icon: Sparkles,
  },
  {
    number: "3",
    title: "Send & Save",
    description:
      "Download your PDFs, mail them via certified mail, or email them directly.",
    icon: Send,
  },
]

const testimonials = [
  {
    quote:
      "I was billed $12,000 for an ER visit. After sending the negotiation letter, the hospital agreed to $4,800.",
    name: "Sarah T.",
    saved: "$7,200",
  },
  {
    quote:
      "I didn’t know my hospital was nonprofit. The hardship application got my entire $8,500 bill eliminated.",
    name: "Marcus R.",
    saved: "$8,500",
  },
  {
    quote:
      "The itemized bill request found $3,200 in duplicate charges I never would have caught.",
    name: "Jennifer L.",
    saved: "$3,200",
  },
]

const faqs = [
  {
    question: "Is this legal?",
    answer:
      "Absolutely. You have a legal right to request an itemized bill, negotiate your charges, and apply for financial assistance. Our letters cite real federal and state laws, including the No Surprises Act and IRS 501(r) requirements. You’re simply exercising your rights as a patient.",
  },
  {
    question: "Will this actually work?",
    answer:
      "Most hospitals would rather negotiate than send your account to collections. Studies show that patients who formally dispute their bills or apply for financial assistance receive reductions the majority of the time. The key is knowing what to ask for and how to ask—that’s what our letters do.",
  },
  {
    question: "What if the hospital ignores my letter?",
    answer:
      "Our letters include specific response deadlines and reference applicable laws. If a hospital ignores a properly documented request, they risk regulatory complaints and legal liability. We also include follow-up letter templates with escalation language in our Complete Kit.",
  },
  {
    question: "How is this different from a billing advocate?",
    answer:
      "Billing advocates typically charge $100-200 per hour or take 25-35% of your savings. Our documents give you the same professional-quality letters and legal citations at a fraction of the cost, and you keep 100% of your savings.",
  },
  {
    question: "Do I need a lawyer?",
    answer:
      "In most cases, no. Our letters are designed to resolve billing disputes without legal action. They use the same legal citations and negotiation strategies that attorneys use, but in a format you can send yourself. If your situation involves malpractice or fraud, we recommend consulting an attorney.",
  },
  {
    question: "What if my bill is already in collections?",
    answer:
      "You can still negotiate. Many collection agencies will accept a reduced lump sum or payment plan. Our negotiation letter includes language specifically for accounts in collections, and the hardship application can sometimes pull a bill back from collections entirely.",
  },
  {
    question: "How quickly will I get my documents?",
    answer:
      "Your customized documents are generated instantly after you complete the questionnaire. You can download them as PDFs right away and send them the same day.",
  },
  {
    question: "Can I use this for dental or veterinary bills?",
    answer:
      "Our letters are specifically designed for medical and hospital bills, where federal laws like the No Surprises Act and IRS 501(r) charity care requirements apply. The negotiation strategies may work for dental bills, but the specific legal citations won’t apply to veterinary bills.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-[#0d9488]/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-[#f43f5e]/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your Medical Bill Is Probably Wrong.{" "}
            <span className="text-[#0d9488]">And Definitely Negotiable.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Generate professional negotiation letters backed by Medicare rates
            and federal law. Most patients save 40-60% on their medical bills.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton href="/fight" variant="accent" size="lg">
              Reduce Your Bill &mdash; $49
            </CTAButton>
            <CTAButton href="#how-it-works" variant="outline" size="lg">
              See How It Works
            </CTAButton>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-500">
              Trusted by thousands of patients
            </span>
            <Badge variant="secondary" className="bg-[#0d9488]/10 text-[#0d9488]">
              4.9/5 rating
            </Badge>
            <Badge variant="secondary" className="bg-[#0d9488]/10 text-[#0d9488]">
              $2M+ saved
            </Badge>
            <Badge variant="secondary" className="bg-[#0d9488]/10 text-[#0d9488]">
              Money-back guarantee
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0d9488]/[0.06] border-y border-[#0d9488]/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#0d9488] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Choose Your Battle Plan
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Every document is customized to your hospital, procedure, and
              financial situation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <Card key={product.name} className="relative flex flex-col">
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#f43f5e] text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488]/10">
                      <Icon className="h-5 w-5 text-[#0d9488]" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <p className="text-3xl font-bold text-slate-900">
                      {product.price}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <CTAButton
                      href="/fight"
                      variant={product.popular ? "accent" : "primary"}
                      size="sm"
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
          <div className="mt-8">
            <Card className="relative border-2 border-[#0d9488] bg-gradient-to-br from-[#0d9488]/[0.04] to-white">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d9488]/10">
                      <Package className="h-6 w-6 text-[#0d9488]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">
                          Complete Bill Fight Kit
                        </CardTitle>
                        <Badge className="bg-[#0d9488] text-white">
                          Save $48
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        All four documents customized to your specific hospital
                        and situation, plus follow-up letter templates.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-500 line-through">$147</p>
                      <p className="text-3xl font-bold text-slate-900">$99</p>
                    </div>
                    <CTAButton href="/fight" variant="accent" size="lg">
                      Get the Kit
                    </CTAButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    "Itemized Bill Request",
                    "Negotiation Letter",
                    "Hardship Application",
                    "Payment Plan Letter",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0d9488]" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="scroll-mt-20 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Three Steps to a Lower Bill
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0d9488] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#0d9488]">
                    Step {step.number}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Real Results from Real Patients
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Illustrative examples based on common outcomes
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="relative">
                <CardContent className="pt-2">
                  <Quote className="mb-3 h-8 w-8 text-[#0d9488]/20" />
                  <p className="text-slate-700 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      Saved {t.saved}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12">
            <Accordion>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0d9488] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stop Overpaying for Healthcare
          </h2>
          <p className="mt-4 text-lg text-teal-100">
            Join thousands of patients who have taken control of their medical
            bills. Your documents are generated instantly and backed by a
            money-back guarantee.
          </p>
          <div className="mt-10">
            <CTAButton
              href="/fight"
              variant="accent"
              size="lg"
              className="text-lg px-10 py-5"
            >
              Reduce Your Bill Now &mdash; $49
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
