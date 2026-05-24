import type { Metadata } from "next"
import {
  FileText,
  HandshakeIcon,
  Heart,
  Shield,
  DollarSign,
  CreditCard,
  Clock,
  UserCheck,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"

export const metadata: Metadata = {
  title: "Know Your Rights — Medical Billing Rights | BillFight",
  description:
    "Understand your legal rights as a patient. Learn about itemized bills, charity care, the No Surprises Act, and more.",
}

const sections = [
  {
    icon: FileText,
    title: "You Have the Right to an Itemized Bill",
    content: [
      "Every patient has the legal right to receive a detailed, line-by-line breakdown of their medical charges. This is not the summary statement most hospitals send automatically. An itemized bill lists each individual service, supply, and medication with its CPT or HCPCS code, a description, the quantity, and the unit price.",
      "Under the No Surprises Act and many state laws, providers must furnish an itemized bill within 30 days of your request. This document is the foundation of any effective bill dispute. Without it, you cannot verify whether your charges are accurate.",
      "Studies consistently find that a majority of medical bills contain at least one error, from duplicate charges to upcoding. Your itemized bill is how you find those errors. Call the billing department, request the full itemized statement, and follow up with a written request sent via certified mail.",
    ],
    tips: [
      "Do not accept a summary statement. Insist on the full itemized breakdown with CPT codes.",
      "Always follow up a phone request with a written request for documentation purposes.",
      "Compare every line item against your discharge summary and medical records.",
    ],
  },
  {
    icon: HandshakeIcon,
    title: "You Have the Right to Negotiate",
    content: [
      "No law requires you to accept the first price a hospital quotes. Medical bills are essentially a starting offer. The listed charges on a hospital bill, known as chargemaster rates, are internal prices that have no direct relationship to the actual cost of providing care. These rates are often 2 to 5 times what Medicare pays for the same services.",
      "Hospitals negotiate with insurance companies every day. They accept reduced rates from Medicare, Medicaid, and private insurers. You have every right to negotiate those same kinds of reductions for yourself, whether you are insured or uninsured.",
      "The most effective negotiation strategy combines data (Medicare rates for your specific procedures), a professional tone, and a clear ask. Offer a lump sum payment at a rate based on Medicare or fair market benchmarks. Most hospitals would rather accept a reduced payment than risk sending your bill to collections.",
    ],
    tips: [
      "Research the Medicare rate for your procedure before you call. It is your strongest leverage point.",
      "Always be polite and professional. Billing staff respond better to respectful requests.",
      "Get any agreed-upon amount or payment plan in writing before making a payment.",
    ],
  },
  {
    icon: Heart,
    title: "Nonprofit Hospitals Must Offer Charity Care",
    content: [
      "Roughly 60% of all hospitals in the United States are nonprofit organizations. Under IRS Section 501(r), every nonprofit hospital is legally required to maintain a financial assistance policy, also known as charity care. This means they must provide free or discounted care to patients who meet their income-based eligibility criteria.",
      "Most nonprofit hospitals provide 100% free care for patients with household income at or below 200% of the Federal Poverty Level. Many extend partial discounts to patients earning up to 300% or even 400% of the FPL. Despite this legal requirement, billions of dollars in available charity care go unclaimed every year because patients do not know these programs exist.",
      "Nonprofit hospitals are also required to widely publicize their financial assistance policies, refrain from extraordinary collection actions before determining a patient's eligibility, and limit charges for eligible patients to amounts generally billed to insured patients. If a nonprofit hospital sent your bill to collections without offering you financial assistance, they may be violating federal law.",
    ],
    tips: [
      "Search for your hospital on the IRS Tax Exempt Organization Search tool to verify nonprofit status.",
      "Apply for financial assistance even if you think you might not qualify. Thresholds vary widely.",
      "You can apply up to 240 days after the first billing statement in most cases.",
    ],
  },
  {
    icon: Shield,
    title: "The No Surprises Act Protects You",
    content: [
      "The No Surprises Act, effective since January 2022, protects patients from unexpected medical bills in several key situations. If you receive emergency care, you cannot be balance-billed by out-of-network providers regardless of whether the facility is in your network. If you receive non-emergency care at an in-network facility, out-of-network providers who treat you (such as anesthesiologists, radiologists, and pathologists) cannot send you a surprise bill.",
      "The law also requires providers to give uninsured and self-pay patients a good faith estimate of expected charges before scheduled services. If the actual bill exceeds the estimate by $400 or more, you can dispute the bill through a patient-provider dispute resolution process.",
      "Out-of-network air ambulance providers are also prohibited from balance-billing patients. The provider and your insurance company must work out the payment between themselves, keeping you out of the middle. Ground ambulance services are not yet covered by the law.",
    ],
    tips: [
      "If you get a surprise bill from an out-of-network provider at an in-network facility, cite the No Surprises Act in your dispute.",
      "Uninsured patients should always request a good faith estimate before any scheduled procedure.",
      "File complaints with CMS at 1-800-985-3059 if a provider violates the No Surprises Act.",
    ],
  },
  {
    icon: DollarSign,
    title: "Price Transparency Is Required",
    content: [
      "Federal regulations require hospitals to make their prices publicly available. Since January 2021, hospitals must publish a machine-readable file containing their standard charges for all items and services. They must also provide a consumer-friendly tool that allows patients to look up estimated prices for at least 300 shoppable services.",
      "This price transparency data can be a powerful tool in your negotiation. If a hospital's published price for your procedure is lower than what you were billed, you have concrete evidence to dispute the charge. Similarly, comparing prices across hospitals in your area can reveal whether your bill is within the normal range or significantly inflated.",
      "While compliance has been inconsistent and enforcement is ongoing, these regulations give patients more information than ever before. Many hospitals now have online price estimator tools that allow you to look up estimated costs before scheduling a procedure.",
    ],
    tips: [
      "Check your hospital's website for their price transparency data or price estimator tool.",
      "Use published price data to compare costs across multiple facilities before scheduling non-emergency procedures.",
      "If your hospital has not published required pricing data, file a complaint with CMS.",
    ],
  },
  {
    icon: CreditCard,
    title: "Medical Debt Credit Reporting Has Changed",
    content: [
      "Major changes to medical debt credit reporting took effect in 2023, providing significant relief for patients. Paid medical debt is no longer included on credit reports. Medical debts under $500 are excluded from credit reports regardless of payment status. Unpaid medical debt does not appear on credit reports until at least one year after it is sent to collections, giving patients substantially more time to resolve their bills.",
      "The Consumer Financial Protection Bureau has issued additional rules aimed at further reducing the impact of medical debt on credit scores. The overall trajectory is clearly toward removing medical debt from credit reporting entirely.",
      "These changes mean that resolving a medical bill, even after a delay, removes its credit impact. If you have paid medical collections still appearing on your credit report, dispute them with each credit bureau. They should be removed promptly.",
    ],
    tips: [
      "Check your credit report at AnnualCreditReport.com and dispute any paid medical collections.",
      "Never put a medical bill on a credit card. It loses its medical debt protections and becomes regular consumer debt.",
      "If your medical debt is under $500, it should not appear on your credit report at all.",
    ],
  },
  {
    icon: Clock,
    title: "Statute of Limitations on Medical Debt",
    content: [
      "Every state has a statute of limitations on debt collection, including medical debt. This is the time period during which a creditor or collection agency can sue you to collect the debt. Once the statute of limitations expires, the debt is considered time-barred, meaning a court can dismiss a lawsuit filed after the deadline.",
      "The statute of limitations for medical debt varies significantly by state, ranging from 3 to 10 years in most states. The clock typically starts from the date of your last payment or the date the debt became delinquent. Making a partial payment or even acknowledging the debt in writing can restart the clock in some states.",
      "It is important to understand that a time-barred debt does not disappear. Collectors can still contact you about it, and it may still appear on your credit report during the applicable reporting period. However, they cannot successfully sue you to collect it after the statute of limitations has expired.",
    ],
    tips: [
      "Look up the statute of limitations for medical debt in your specific state.",
      "Be cautious about making partial payments on old debts, as this can restart the statute of limitations.",
      "If a collector sues you for a time-barred debt, you can raise the statute of limitations as a defense in court.",
    ],
  },
  {
    icon: UserCheck,
    title: "When to Get a Patient Advocate",
    content: [
      "While many medical billing disputes can be resolved through self-advocacy, some situations benefit from professional help. If your bill exceeds $10,000, involves multiple providers across different billing systems, or requires navigating a complex insurance appeals process, a patient advocate or medical billing advocate can be invaluable.",
      "Patient advocates are professionals who specialize in navigating the healthcare billing system. They can review your bills for errors, negotiate with providers on your behalf, file insurance appeals, and help you apply for financial assistance programs. Many work on a contingency basis, taking a percentage of the amount they save you.",
      "You should also consider professional help if you have been unable to make progress on your own after multiple attempts, if a bill is in collections and the collector is threatening legal action, or if your situation involves a complex insurance dispute with multiple denied claims.",
    ],
    tips: [
      "The Alliance of Claims Assistance Professionals (ACAP) maintains a directory of certified medical billing advocates.",
      "Many patient advocates offer a free initial consultation to evaluate your case.",
      "Before hiring an advocate, understand their fee structure. Common models include hourly rates, flat fees, or a percentage of savings.",
    ],
  },
]

export default function RightsPage() {
  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Know Your Rights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Understanding your legal rights as a patient is the first step to
            fighting unfair medical bills. Here is what you need to know.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d9488]/10">
                      <Icon className="h-6 w-6 text-[#0d9488]" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl leading-snug">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className="text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-[#0d9488] mb-2">
                      Tips
                    </p>
                    <ul className="space-y-2">
                      {section.tips.map((tip, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-0.5 text-[#0d9488]">&bull;</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-xl bg-[#0d9488] p-8 sm:p-10 text-center">
          <Shield className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Know your rights. Now use them.
          </h2>
          <p className="mt-3 text-teal-100 max-w-xl mx-auto">
            Generate professional negotiation letters, itemized bill requests,
            and financial assistance applications that cite the laws protecting
            you.
          </p>
          <div className="mt-6">
            <CTAButton href="/fight" variant="accent" size="lg">
              Fight Your Bill &mdash; $49
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}
