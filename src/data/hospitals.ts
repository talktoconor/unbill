export interface Hospital {
  slug: string
  name: string
  system: string
  city: string
  state: string
  type: "nonprofit" | "for-profit"
  charityCarePolicy: string
  incomeThreshold: string
  applicationProcess: string
  billingPhone: string
  website: string
  taxExemptionValue: string
  charityCareProvided: string
}

export const hospitals: Hospital[] = [
  {
    slug: "hca-healthcare",
    name: "HCA Healthcare",
    system: "HCA Healthcare",
    city: "Nashville",
    state: "TN",
    type: "for-profit",
    charityCarePolicy:
      "HCA offers an Ethically Responsible Billing policy providing discounts for uninsured patients earning below 400% of the Federal Poverty Level. Patients below 200% FPL may qualify for full write-offs.",
    incomeThreshold: "Up to 400% FPL for discounts; up to 200% FPL for full charity care",
    applicationProcess:
      "Submit a Financial Assistance Application with proof of income, tax returns, and bank statements to the facility's Patient Financial Services department within 240 days of first billing statement.",
    billingPhone: "1-800-422-4372",
    website: "https://hcahealthcare.com",
    taxExemptionValue: "N/A (for-profit)",
    charityCareProvided: "$3.4 billion in uncompensated care (2023)",
  },
  {
    slug: "commonspirit-health",
    name: "CommonSpirit Health",
    system: "CommonSpirit Health",
    city: "Chicago",
    state: "IL",
    type: "nonprofit",
    charityCarePolicy:
      "CommonSpirit provides free care for patients with household income at or below 250% FPL. Patients between 250-400% FPL receive discounts on a sliding scale. All uninsured patients receive a minimum discount.",
    incomeThreshold: "100% free care below 250% FPL; sliding scale 250-400% FPL",
    applicationProcess:
      "Complete the Financial Assistance Application available at any registration desk or online. Submit with income verification documents within 240 days of discharge. Presumptive eligibility screening is available.",
    billingPhone: "1-855-822-7684",
    website: "https://commonspirit.org",
    taxExemptionValue: "$4.2 billion in community benefit (2023)",
    charityCareProvided: "$1.8 billion in charity care (2023)",
  },
  {
    slug: "ascension",
    name: "Ascension",
    system: "Ascension",
    city: "St. Louis",
    state: "MO",
    type: "nonprofit",
    charityCarePolicy:
      "Ascension provides free care for uninsured and underinsured patients with income at or below 250% FPL. Discounted care is available for patients between 250-400% FPL on a sliding fee schedule.",
    incomeThreshold: "100% free care below 250% FPL; sliding scale 250-400% FPL",
    applicationProcess:
      "Apply through the Patient Financial Services office. Submit the Financial Assistance Application with supporting income documentation. Presumptive eligibility may be determined through third-party screening.",
    billingPhone: "1-866-855-4272",
    website: "https://ascension.org",
    taxExemptionValue: "$3.8 billion in community benefit (2023)",
    charityCareProvided: "$1.5 billion in charity care (2023)",
  },
  {
    slug: "trinity-health",
    name: "Trinity Health",
    system: "Trinity Health",
    city: "Livonia",
    state: "MI",
    type: "nonprofit",
    charityCarePolicy:
      "Trinity Health provides 100% charity care for patients at or below 200% FPL. A sliding scale discount applies for patients between 200-400% FPL. Uninsured patients automatically receive a discount off charges.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Request a Financial Assistance Application from Patient Financial Services or download from the hospital website. Submit with proof of income within 240 days. Financial counselors are available to assist.",
    billingPhone: "1-866-874-6489",
    website: "https://trinity-health.org",
    taxExemptionValue: "$2.9 billion in community benefit (2023)",
    charityCareProvided: "$960 million in charity care (2023)",
  },
  {
    slug: "providence",
    name: "Providence",
    system: "Providence",
    city: "Renton",
    state: "WA",
    type: "nonprofit",
    charityCarePolicy:
      "Providence offers 100% charity care for patients at or below 300% FPL. Patients between 300-350% FPL may receive partial discounts. Washington state patients may qualify under expanded state charity care laws up to 400% FPL.",
    incomeThreshold: "100% free care below 300% FPL; discounts up to 350% FPL",
    applicationProcess:
      "Complete the Financial Assistance Application available online or at any facility. Submit with income documentation. Presumptive eligibility screening is performed automatically for many patients.",
    billingPhone: "1-866-747-2455",
    website: "https://providence.org",
    taxExemptionValue: "$3.1 billion in community benefit (2023)",
    charityCareProvided: "$1.2 billion in charity care (2023)",
  },
  {
    slug: "advocate-aurora-health",
    name: "Advocate Aurora Health",
    system: "Advocate Health",
    city: "Downers Grove",
    state: "IL",
    type: "nonprofit",
    charityCarePolicy:
      "Advocate Aurora provides free care for patients with income at or below 200% FPL. A sliding scale discount is available for patients between 200-600% FPL. Emergency services patients may qualify for additional assistance.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-600% FPL",
    applicationProcess:
      "Submit a Financial Assistance Application with proof of income and assets. Applications accepted up to 240 days from first post-discharge billing statement. Financial counselors available at all facilities.",
    billingPhone: "1-800-326-2250",
    website: "https://advocatehealth.org",
    taxExemptionValue: "$3.5 billion in community benefit (2023)",
    charityCareProvided: "$890 million in charity care (2023)",
  },
  {
    slug: "atrium-health",
    name: "Atrium Health",
    system: "Advocate Health",
    city: "Charlotte",
    state: "NC",
    type: "nonprofit",
    charityCarePolicy:
      "Atrium Health provides 100% charity care for patients at or below 200% FPL. Discounted care is available for patients between 200-300% FPL. Catastrophic medical expense assistance available for higher incomes.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Apply through Patient Financial Services. Submit the Charity Care Application with income documentation including pay stubs, tax returns, and bank statements within 240 days of service.",
    billingPhone: "1-704-468-8939",
    website: "https://atriumhealth.org",
    taxExemptionValue: "$2.8 billion in community benefit (2023)",
    charityCareProvided: "$780 million in charity care (2023)",
  },
  {
    slug: "northwell-health",
    name: "Northwell Health",
    system: "Northwell Health",
    city: "New Hyde Park",
    state: "NY",
    type: "nonprofit",
    charityCarePolicy:
      "Northwell provides 100% charity care for patients at or below 300% FPL. Patients between 300-400% FPL may receive partial discounts. New York state law requires additional financial assistance protections.",
    incomeThreshold: "100% free care below 300% FPL; discounts up to 400% FPL",
    applicationProcess:
      "Complete a Financial Assistance Application available at admissions, patient financial services, or online. Submit with income verification within 240 days. Northwell proactively screens patients for eligibility.",
    billingPhone: "1-800-995-5727",
    website: "https://northwell.edu",
    taxExemptionValue: "$2.5 billion in community benefit (2023)",
    charityCareProvided: "$820 million in charity care (2023)",
  },
  {
    slug: "mass-general-brigham",
    name: "Mass General Brigham",
    system: "Mass General Brigham",
    city: "Somerville",
    state: "MA",
    type: "nonprofit",
    charityCarePolicy:
      "Mass General Brigham provides free care for patients at or below 300% FPL through its Health Safety Net program. Patients between 300-400% FPL may receive partial discounts. Massachusetts state law provides additional protections.",
    incomeThreshold: "100% free care below 300% FPL; partial discounts up to 400% FPL",
    applicationProcess:
      "Apply through the Financial Counseling office. The Health Safety Net application is available online and at all facilities. Submit with proof of income, residency, and insurance status within 120 days.",
    billingPhone: "1-866-378-9421",
    website: "https://massgeneralbrigham.org",
    taxExemptionValue: "$2.7 billion in community benefit (2023)",
    charityCareProvided: "$650 million in charity care (2023)",
  },
  {
    slug: "cleveland-clinic",
    name: "Cleveland Clinic",
    system: "Cleveland Clinic",
    city: "Cleveland",
    state: "OH",
    type: "nonprofit",
    charityCarePolicy:
      "Cleveland Clinic provides 100% charity care for patients at or below 200% FPL. A sliding scale discount applies for patients between 200-400% FPL. All uninsured patients receive a minimum uninsured discount.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Submit a Financial Assistance Application to Patient Financial Services. Applications available online, at registration, or by calling the billing department. Include income and asset documentation within 240 days.",
    billingPhone: "1-866-621-8396",
    website: "https://clevelandclinic.org",
    taxExemptionValue: "$2.3 billion in community benefit (2023)",
    charityCareProvided: "$540 million in charity care (2023)",
  },
  {
    slug: "mayo-clinic",
    name: "Mayo Clinic",
    system: "Mayo Clinic",
    city: "Rochester",
    state: "MN",
    type: "nonprofit",
    charityCarePolicy:
      "Mayo Clinic provides financial assistance for patients at or below 400% FPL. Patients below 200% FPL may receive 100% write-off. Sliding scale discounts available between 200-400% FPL.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Contact the Financial Assistance Office or apply online. Submit the application with income documentation, tax returns, and proof of assets. A financial counselor will review within 30 days of submission.",
    billingPhone: "1-507-266-0664",
    website: "https://mayoclinic.org",
    taxExemptionValue: "$3.0 billion in community benefit (2023)",
    charityCareProvided: "$720 million in charity care (2023)",
  },
  {
    slug: "upmc",
    name: "UPMC",
    system: "UPMC",
    city: "Pittsburgh",
    state: "PA",
    type: "nonprofit",
    charityCarePolicy:
      "UPMC provides free care for patients at or below 200% FPL. Discounted care is available for patients between 200-400% FPL. Uninsured patients automatically receive a prompt-pay discount.",
    incomeThreshold: "100% free care below 200% FPL; discounts 200-400% FPL",
    applicationProcess:
      "Request a Financial Assistance Application from the billing department or download from UPMC's website. Submit with income verification within 240 days. UPMC performs presumptive eligibility screening.",
    billingPhone: "1-800-533-8762",
    website: "https://upmc.com",
    taxExemptionValue: "$2.1 billion in community benefit (2023)",
    charityCareProvided: "$480 million in charity care (2023)",
  },
  {
    slug: "nyu-langone",
    name: "NYU Langone Health",
    system: "NYU Langone Health",
    city: "New York",
    state: "NY",
    type: "nonprofit",
    charityCarePolicy:
      "NYU Langone provides 100% charity care for patients at or below 300% FPL. Partial discounts are available for patients between 300-400% FPL. Emergency patients are screened for financial assistance eligibility.",
    incomeThreshold: "100% free care below 300% FPL; discounts up to 400% FPL",
    applicationProcess:
      "Apply through Patient Financial Services. The Financial Assistance Application is available online and at all facilities. Submit with income documentation including pay stubs and tax returns within 240 days.",
    billingPhone: "1-646-929-7800",
    website: "https://nyulangone.org",
    taxExemptionValue: "$1.9 billion in community benefit (2023)",
    charityCareProvided: "$410 million in charity care (2023)",
  },
  {
    slug: "cedars-sinai",
    name: "Cedars-Sinai Medical Center",
    system: "Cedars-Sinai",
    city: "Los Angeles",
    state: "CA",
    type: "nonprofit",
    charityCarePolicy:
      "Cedars-Sinai provides 100% charity care for patients at or below 200% FPL. A sliding scale discount is available for patients between 200-400% FPL. California law requires additional financial assistance protections for eligible patients.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Complete the Financial Assistance Application available from the Patient Financial Services office or online. Submit with proof of income and assets. Under California law, the hospital must screen emergency patients for eligibility.",
    billingPhone: "1-800-233-2771",
    website: "https://cedars-sinai.org",
    taxExemptionValue: "$1.8 billion in community benefit (2023)",
    charityCareProvided: "$380 million in charity care (2023)",
  },
  {
    slug: "kaiser-permanente",
    name: "Kaiser Permanente",
    system: "Kaiser Permanente",
    city: "Oakland",
    state: "CA",
    type: "nonprofit",
    charityCarePolicy:
      "Kaiser Permanente provides charity care through its Medical Financial Assistance program. Patients at or below 350% FPL may qualify for 100% charity care. Sliding scale discounts available up to 400% FPL. Kaiser also offers its own insurance plans.",
    incomeThreshold: "100% free care below 350% FPL; discounts up to 400% FPL",
    applicationProcess:
      "Apply for Medical Financial Assistance through Member Services or the billing department. Submit the application with income verification documents. Kaiser proactively screens patients and may grant presumptive eligibility.",
    billingPhone: "1-866-866-3951",
    website: "https://kaiserpermanente.org",
    taxExemptionValue: "$4.0 billion in community benefit (2023)",
    charityCareProvided: "$1.1 billion in charity care (2023)",
  },
  {
    slug: "intermountain-health",
    name: "Intermountain Health",
    system: "Intermountain Health",
    city: "Salt Lake City",
    state: "UT",
    type: "nonprofit",
    charityCarePolicy:
      "Intermountain provides 100% charity care for patients at or below 200% FPL. A sliding scale discount applies for patients between 200-300% FPL. Catastrophic medical expense assistance is available for higher-income patients.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Contact Patient Financial Services to request a Financial Assistance Application. Submit with income documentation within 240 days. Financial counselors are available at all facilities to assist with applications.",
    billingPhone: "1-800-442-4845",
    website: "https://intermountainhealth.org",
    taxExemptionValue: "$2.2 billion in community benefit (2023)",
    charityCareProvided: "$520 million in charity care (2023)",
  },
  {
    slug: "bon-secours-mercy-health",
    name: "Bon Secours Mercy Health",
    system: "Bon Secours Mercy Health",
    city: "Cincinnati",
    state: "OH",
    type: "nonprofit",
    charityCarePolicy:
      "Bon Secours Mercy Health provides 100% charity care for patients at or below 200% FPL. Sliding scale discounts available for patients between 200-400% FPL. Emergency patients are screened for eligibility during registration.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Submit a Financial Assistance Application to Patient Financial Services with proof of income including pay stubs, tax returns, or benefit letters. Applications available at all facilities and online within 240 days.",
    billingPhone: "1-844-262-2555",
    website: "https://bonsecours.com",
    taxExemptionValue: "$1.6 billion in community benefit (2023)",
    charityCareProvided: "$420 million in charity care (2023)",
  },
  {
    slug: "novant-health",
    name: "Novant Health",
    system: "Novant Health",
    city: "Winston-Salem",
    state: "NC",
    type: "nonprofit",
    charityCarePolicy:
      "Novant Health provides 100% charity care for patients at or below 200% FPL. A sliding scale discount is available for patients between 200-300% FPL. Uninsured patients receive a minimum discount on all services.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Contact Patient Financial Services or visit the Novant Health website to obtain a Financial Assistance Application. Submit with income verification documents within 240 days of first billing statement.",
    billingPhone: "1-800-218-5076",
    website: "https://novanthealth.org",
    taxExemptionValue: "$1.4 billion in community benefit (2023)",
    charityCareProvided: "$350 million in charity care (2023)",
  },
  {
    slug: "banner-health",
    name: "Banner Health",
    system: "Banner Health",
    city: "Phoenix",
    state: "AZ",
    type: "nonprofit",
    charityCarePolicy:
      "Banner Health provides 100% charity care for patients at or below 200% FPL. Patients between 200-350% FPL may qualify for partial discounts. Uninsured patients automatically receive a self-pay discount.",
    incomeThreshold: "100% free care below 200% FPL; discounts up to 350% FPL",
    applicationProcess:
      "Apply for financial assistance through Patient Financial Services. Submit the application with proof of income and assets within 240 days. Financial counselors screen patients at bedside when possible.",
    billingPhone: "1-888-823-8770",
    website: "https://bannerhealth.com",
    taxExemptionValue: "$1.7 billion in community benefit (2023)",
    charityCareProvided: "$390 million in charity care (2023)",
  },
  {
    slug: "sutter-health",
    name: "Sutter Health",
    system: "Sutter Health",
    city: "Sacramento",
    state: "CA",
    type: "nonprofit",
    charityCarePolicy:
      "Sutter Health provides 100% charity care for patients at or below 250% FPL. Sliding scale discounts available for patients between 250-400% FPL. California law requires screening of emergency and urgent care patients for eligibility.",
    incomeThreshold: "100% free care below 250% FPL; sliding scale 250-400% FPL",
    applicationProcess:
      "Complete the Financial Assistance Application available from Patient Business Services or online. Submit with income documentation within 150 days. Under California AB 774, the hospital must assist patients in applying.",
    billingPhone: "1-866-228-4975",
    website: "https://sutterhealth.org",
    taxExemptionValue: "$1.9 billion in community benefit (2023)",
    charityCareProvided: "$450 million in charity care (2023)",
  },
  {
    slug: "uchealth",
    name: "UCHealth",
    system: "UCHealth",
    city: "Aurora",
    state: "CO",
    type: "nonprofit",
    charityCarePolicy:
      "UCHealth provides 100% charity care for patients at or below 250% FPL. Discounted care is available for patients between 250-400% FPL. Colorado's Hospital Discounted Care program provides additional protections.",
    incomeThreshold: "100% free care below 250% FPL; sliding scale 250-400% FPL",
    applicationProcess:
      "Apply through Patient Financial Services. Submit the financial assistance application with income and asset documentation. Colorado law requires hospitals to screen emergency patients for the Hospital Discounted Care program.",
    billingPhone: "1-888-824-4011",
    website: "https://uchealth.org",
    taxExemptionValue: "$1.3 billion in community benefit (2023)",
    charityCareProvided: "$310 million in charity care (2023)",
  },
  {
    slug: "ochsner-health",
    name: "Ochsner Health",
    system: "Ochsner Health",
    city: "New Orleans",
    state: "LA",
    type: "nonprofit",
    charityCarePolicy:
      "Ochsner Health provides 100% charity care for patients at or below 200% FPL. Patients between 200-300% FPL may receive partial discounts on a sliding scale. Uninsured patients receive a self-pay discount.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Request a Financial Assistance Application from Patient Financial Services or the hospital's website. Submit with proof of income and assets within 240 days. Financial counselors available at all locations.",
    billingPhone: "1-800-231-5257",
    website: "https://ochsner.org",
    taxExemptionValue: "$1.1 billion in community benefit (2023)",
    charityCareProvided: "$280 million in charity care (2023)",
  },
  {
    slug: "prisma-health",
    name: "Prisma Health",
    system: "Prisma Health",
    city: "Greenville",
    state: "SC",
    type: "nonprofit",
    charityCarePolicy:
      "Prisma Health provides 100% charity care for patients at or below 200% FPL. Sliding scale discounts available for patients between 200-300% FPL. Emergency patients are screened for financial assistance eligibility.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Apply through the Patient Financial Assistance office. Submit the application with income documentation including pay stubs, tax returns, and bank statements within 240 days of service.",
    billingPhone: "1-855-774-7621",
    website: "https://prismahealth.org",
    taxExemptionValue: "$980 million in community benefit (2023)",
    charityCareProvided: "$240 million in charity care (2023)",
  },
  {
    slug: "adventhealth",
    name: "AdventHealth",
    system: "AdventHealth",
    city: "Altamonte Springs",
    state: "FL",
    type: "nonprofit",
    charityCarePolicy:
      "AdventHealth provides 100% charity care for patients at or below 200% FPL. Patients between 200-300% FPL may qualify for partial discounts. All uninsured patients receive a self-pay discount off billed charges.",
    incomeThreshold: "100% free care below 200% FPL; discounts 200-300% FPL",
    applicationProcess:
      "Submit a Financial Assistance Application to Patient Financial Services with income verification documents. Applications are available at all facilities and online. Financial counselors assist patients during and after admission.",
    billingPhone: "1-877-992-3836",
    website: "https://adventhealth.com",
    taxExemptionValue: "$2.0 billion in community benefit (2023)",
    charityCareProvided: "$550 million in charity care (2023)",
  },
  {
    slug: "geisinger",
    name: "Geisinger",
    system: "Geisinger",
    city: "Danville",
    state: "PA",
    type: "nonprofit",
    charityCarePolicy:
      "Geisinger provides 100% charity care for patients at or below 200% FPL. A sliding scale discount is available for patients between 200-400% FPL. Catastrophic medical expense policy applies to patients with qualifying high bills.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Contact Patient Financial Services to request a Financial Assistance Application. Submit with proof of income and assets within 240 days. Geisinger performs proactive screening and may grant presumptive eligibility.",
    billingPhone: "1-800-275-6401",
    website: "https://geisinger.org",
    taxExemptionValue: "$1.2 billion in community benefit (2023)",
    charityCareProvided: "$290 million in charity care (2023)",
  },
  {
    slug: "unitypoint-health",
    name: "UnityPoint Health",
    system: "UnityPoint Health",
    city: "West Des Moines",
    state: "IA",
    type: "nonprofit",
    charityCarePolicy:
      "UnityPoint Health provides 100% charity care for patients at or below 200% FPL. Patients between 200-400% FPL may qualify for discounts on a sliding scale. Self-pay patients receive an automatic discount.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-400% FPL",
    applicationProcess:
      "Request a Financial Assistance Application from Patient Financial Services. Submit with income documentation within 240 days. Financial counselors are available to help complete applications at all facilities.",
    billingPhone: "1-800-543-3727",
    website: "https://unitypoint.org",
    taxExemptionValue: "$820 million in community benefit (2023)",
    charityCareProvided: "$195 million in charity care (2023)",
  },
  {
    slug: "baylor-scott-white",
    name: "Baylor Scott & White Health",
    system: "Baylor Scott & White Health",
    city: "Dallas",
    state: "TX",
    type: "nonprofit",
    charityCarePolicy:
      "Baylor Scott & White provides 100% charity care for patients at or below 200% FPL. Sliding scale discounts available for patients between 200-300% FPL. All uninsured patients receive a self-pay discount.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Apply for financial assistance through Patient Financial Services. Submit the application with income verification documents including tax returns and pay stubs within 240 days of the date of service.",
    billingPhone: "1-800-442-0296",
    website: "https://bswhealth.com",
    taxExemptionValue: "$2.4 billion in community benefit (2023)",
    charityCareProvided: "$580 million in charity care (2023)",
  },
  {
    slug: "houston-methodist",
    name: "Houston Methodist",
    system: "Houston Methodist",
    city: "Houston",
    state: "TX",
    type: "nonprofit",
    charityCarePolicy:
      "Houston Methodist provides 100% charity care for patients at or below 200% FPL. Patients between 200-400% FPL may qualify for partial discounts. Uninsured patients receive an automatic prompt-pay discount.",
    incomeThreshold: "100% free care below 200% FPL; discounts 200-400% FPL",
    applicationProcess:
      "Contact the Financial Counseling department to request an application. Submit with income and asset documentation within 240 days. Financial counselors are available to screen patients at the bedside.",
    billingPhone: "1-832-667-5800",
    website: "https://houstonmethodist.org",
    taxExemptionValue: "$1.5 billion in community benefit (2023)",
    charityCareProvided: "$370 million in charity care (2023)",
  },
  {
    slug: "memorial-hermann",
    name: "Memorial Hermann Health System",
    system: "Memorial Hermann",
    city: "Houston",
    state: "TX",
    type: "nonprofit",
    charityCarePolicy:
      "Memorial Hermann provides 100% charity care for patients at or below 200% FPL. A sliding scale discount is available for patients between 200-300% FPL. Self-pay patients receive a minimum uninsured discount.",
    incomeThreshold: "100% free care below 200% FPL; sliding scale 200-300% FPL",
    applicationProcess:
      "Apply through the Patient Access or Financial Counseling department. Submit the Financial Assistance Application with proof of income and residency within 240 days of discharge.",
    billingPhone: "1-713-222-2273",
    website: "https://memorialhermann.org",
    taxExemptionValue: "$1.6 billion in community benefit (2023)",
    charityCareProvided: "$400 million in charity care (2023)",
  },
  {
    slug: "mount-sinai",
    name: "Mount Sinai Health System",
    system: "Mount Sinai",
    city: "New York",
    state: "NY",
    type: "nonprofit",
    charityCarePolicy:
      "Mount Sinai provides 100% charity care for patients at or below 300% FPL. Partial discounts are available for patients between 300-400% FPL. New York state law provides additional financial protections for patients.",
    incomeThreshold: "100% free care below 300% FPL; discounts up to 400% FPL",
    applicationProcess:
      "Complete the Financial Assistance Application through Patient Financial Services. Applications available at all facilities and online. Submit with income documentation within 240 days. Financial counselors screen patients proactively.",
    billingPhone: "1-212-731-3100",
    website: "https://mountsinai.org",
    taxExemptionValue: "$2.0 billion in community benefit (2023)",
    charityCareProvided: "$460 million in charity care (2023)",
  },
]
