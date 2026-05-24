import { NextRequest } from "next/server"
import {
  generateLetter,
  generateAllLetters,
  type LetterType,
  type BillDetails,
} from "@/lib/generate-letter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      letterType,
      hospitalName,
      hospitalAddress,
      patientName,
      patientAddress,
      totalAmount,
      dateOfService,
      procedure,
      accountNumber,
      insuranceStatus,
      affordableAmount,
      income,
      householdSize,
      employmentStatus,
    } = body

    if (!hospitalName || !patientName || !totalAmount || !dateOfService) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const details: BillDetails = {
      hospitalName,
      hospitalAddress: hospitalAddress || "",
      patientName,
      patientAddress: patientAddress || "",
      totalAmount: Number(totalAmount),
      dateOfService,
      procedure: procedure || "",
      accountNumber: accountNumber || "",
      insuranceStatus: insuranceStatus || "",
      affordableAmount: affordableAmount ? Number(affordableAmount) : undefined,
      income,
      householdSize: householdSize ? Number(householdSize) : undefined,
      employmentStatus,
    }

    if (letterType === "bundle") {
      const letters = await generateAllLetters(details)
      return Response.json({ letters, type: "bundle" })
    }

    const validTypes: LetterType[] = [
      "itemized",
      "negotiation",
      "hardship",
      "payment_plan",
    ]
    if (!validTypes.includes(letterType as LetterType)) {
      return Response.json({ error: "Invalid letter type" }, { status: 400 })
    }

    const letter = await generateLetter(letterType as LetterType, details)
    return Response.json({ letter, type: letterType })
  } catch (error) {
    console.error("Letter generation error:", error)
    return Response.json(
      { error: "Failed to generate letter. Please try again." },
      { status: 500 }
    )
  }
}
