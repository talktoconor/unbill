import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist. But your right to
        negotiate your medical bills does.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/fight"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
        >
          Fight Your Medical Bill
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 underline underline-offset-4 transition-colors hover:text-gray-900"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
