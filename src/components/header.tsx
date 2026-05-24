"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Shield, Menu } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CTAButton } from "@/components/cta-button"

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/rights", label: "Know Your Rights" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-[#0d9488]" />
          <span className="text-xl font-bold text-[#1e293b]">
            Bill<span className="text-[#0d9488]">Slash</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1e293b] transition-colors hover:text-[#0d9488]"
            >
              {link.label}
            </Link>
          ))}
          <CTAButton href="/fight" variant="accent" size="sm">
            Fight My Bill
          </CTAButton>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#0d9488]" />
                  <span className="font-bold text-[#1e293b]">
                    Bill<span className="text-[#0d9488]">Slash</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[#1e293b] transition-colors hover:text-[#0d9488]"
                  >
                    {link.label}
                  </Link>
                ))}
                <CTAButton
                  href="/fight"
                  variant="accent"
                  size="md"
                  className="mt-4 w-full text-center"
                >
                  Fight My Bill
                </CTAButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
