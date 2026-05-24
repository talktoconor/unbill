import Anthropic from "@anthropic-ai/sdk"

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic()
  : (null as unknown as Anthropic)

export type LetterType = "itemized" | "negotiation" | "hardship" | "payment_plan"

export interface BillDetails {
  hospitalName: string
  hospitalAddress: string
  patientName: string
  patientAddress: string
  totalAmount: number
  dateOfService: string
  procedure: string
  accountNumber: string
  insuranceStatus: string
  affordableAmount?: number
  income?: string
  householdSize?: number
  employmentStatus?: string
}

const SYSTEM_PROMPTS: Record<LetterType, string> = {
  itemized: `You are a medical billing expert. Generate a formal, professional letter requesting an itemized bill from a hospital or medical provider. The letter should:
- Cite the patient's legal right to an itemized bill
- Reference the No Surprises Act and state billing transparency laws
- Request a complete line-by-line breakdown including CPT/HCPCS codes, descriptions, quantities, and charges
- Set a 30-day deadline for response
- Be firm but professional
- Include proper letter formatting with date, addresses, RE line, and signature block`,

  negotiation: `You are a medical billing negotiation expert. Generate a professional negotiation letter to reduce a medical bill. The letter should:
- Acknowledge the debt but dispute the amount as exceeding fair market value
- Reference Medicare reimbursement rates (typically 40-60% of billed charges)
- Cite Healthcare Bluebook and FAIR Health fair price data
- Offer a specific counter-amount as payment in full
- Mention the hospital's price transparency obligations
- Note that the patient is prepared to pay promptly if a fair price is agreed
- Be assertive but respectful
- Include proper letter formatting`,

  hardship: `You are a medical billing and charity care expert. Generate a financial hardship application letter. The letter should:
- Explain the patient's financial situation compassionately but factually
- Reference the hospital's obligations under IRS 501(r) if it's a nonprofit
- Cite the hospital's charity care policy if known
- Request a reduction or elimination of the bill based on financial hardship
- Include Federal Poverty Level references and how the patient's income compares
- Mention that the patient is willing to provide documentation
- Request the hospital's financial assistance application if not already obtained
- Include proper letter formatting`,

  payment_plan: `You are a medical billing expert. Generate a professional letter proposing a payment plan. The letter should:
- Acknowledge the debt and express intent to pay
- Propose specific monthly payments the patient can afford (typically $25-50/month)
- Request interest-free terms
- Note that establishing a payment plan should prevent referral to collections
- Ask for written confirmation of the agreed terms
- Be cooperative and solution-oriented
- Include proper letter formatting`,
}

export async function generateLetter(
  type: LetterType,
  details: BillDetails
): Promise<string> {
  const userPrompt = buildUserPrompt(type, details)

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: SYSTEM_PROMPTS[type],
    messages: [{ role: "user", content: userPrompt }],
  })

  const textBlock = message.content.find((block) => block.type === "text")
  return textBlock?.text ?? ""
}

function buildUserPrompt(type: LetterType, details: BillDetails): string {
  let prompt = `Generate a ${type.replace("_", " ")} letter with these details:

Patient: ${details.patientName}
Patient Address: ${details.patientAddress}
Hospital/Provider: ${details.hospitalName}
Hospital Address: ${details.hospitalAddress}
Account Number: ${details.accountNumber}
Date of Service: ${details.dateOfService}
Procedure/Diagnosis: ${details.procedure}
Total Amount Billed: $${details.totalAmount.toLocaleString()}
Insurance Status: ${details.insuranceStatus}
Today's Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`

  if (type === "negotiation" && details.affordableAmount) {
    prompt += `\nAmount patient can pay: $${details.affordableAmount.toLocaleString()}`
  }

  if (type === "hardship") {
    if (details.income) prompt += `\nAnnual household income range: ${details.income}`
    if (details.householdSize) prompt += `\nHousehold size: ${details.householdSize}`
    if (details.employmentStatus) prompt += `\nEmployment status: ${details.employmentStatus}`
  }

  if (type === "payment_plan" && details.affordableAmount) {
    prompt += `\nMonthly amount patient can afford: $${details.affordableAmount.toLocaleString()}`
  }

  return prompt
}

export async function generateAllLetters(details: BillDetails): Promise<Record<LetterType, string>> {
  const types: LetterType[] = ["itemized", "negotiation", "hardship", "payment_plan"]
  const results = await Promise.all(types.map((type) => generateLetter(type, details)))
  return Object.fromEntries(types.map((type, i) => [type, results[i]])) as Record<LetterType, string>
}
