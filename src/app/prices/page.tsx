import Link from "next/link"
import { DollarSign, ArrowRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { procedures } from "@/data/procedures"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function PricesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Medical Procedure Price Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Know what a fair price is before you negotiate.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((procedure) => (
            <Link key={procedure.slug} href={`/prices/${procedure.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-snug">
                    {procedure.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Insured avg.</p>
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(procedure.averageCostInsured)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Uninsured avg.</p>
                      <p className="font-semibold text-[#f43f5e]">
                        {formatCurrency(procedure.averageCostUninsured)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm">
                    <DollarSign className="h-3.5 w-3.5 text-[#0d9488]" />
                    <span className="text-gray-500">Medicare rate:</span>
                    <span className="font-semibold text-[#0d9488]">
                      {formatCurrency(procedure.medicareRate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium text-[#0d9488]">
                    See Fair Price
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
