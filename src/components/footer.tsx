import Link from "next/link"
import { Shield } from "lucide-react"

const productLinks = [
  { href: "/fight", label: "Negotiation Letter" },
  { href: "/fight", label: "Itemized Bill Request" },
  { href: "/fight", label: "Charity Care Application" },
  { href: "/fight", label: "Payment Plan Request" },
  { href: "/fight", label: "Insurance Appeal" },
]

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/rights", label: "Know Your Rights" },
  { href: "/hospitals", label: "Hospital Directory" },
  { href: "/prices", label: "Price Guide" },
]

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Shield className="h-7 w-7 text-[#0d9488]" />
              <span className="text-xl font-bold">
                Bill<span className="text-[#0d9488]">Slash</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Medical Bills Too High? Fight Back.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Join thousands of patients who have saved on their medical bills
              using our negotiation tools.
            </p>
          </div>

          {/* Link columns */}
          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-xs leading-relaxed text-slate-500">
            BillSlash is not a law firm, medical billing company, or financial
            advisor. We generate negotiation and request documents — we do not
            guarantee bill reduction.
          </p>
          <p className="mt-4 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} BillSlash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
