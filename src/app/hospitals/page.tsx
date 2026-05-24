"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Building2, MapPin } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { hospitals } from "@/data/hospitals"

export default function HospitalsPage() {
  const [query, setQuery] = useState("")

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.system.toLowerCase().includes(query.toLowerCase()) ||
    h.city.toLowerCase().includes(query.toLowerCase()) ||
    h.state.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Hospital Charity Care Directory
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Most nonprofit hospitals are required to offer free or reduced-cost
            care. Find your hospital&apos;s charity care policy.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by hospital name, city, or state..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No hospitals found matching &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((hospital) => (
              <Link key={hospital.slug} href={`/hospitals/${hospital.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-snug">
                        {hospital.name}
                      </CardTitle>
                      <Badge
                        variant={
                          hospital.type === "nonprofit" ? "default" : "secondary"
                        }
                        className={
                          hospital.type === "nonprofit"
                            ? "bg-[#0d9488] hover:bg-[#0f766e] shrink-0"
                            : "shrink-0"
                        }
                      >
                        {hospital.type === "nonprofit"
                          ? "Nonprofit"
                          : "For-Profit"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{hospital.system}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {hospital.city}, {hospital.state}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {hospital.incomeThreshold}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
