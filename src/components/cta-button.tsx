"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm font-medium",
  md: "px-6 py-3 text-base font-semibold",
  lg: "px-8 py-4 text-lg font-semibold",
} as const

const variantClasses = {
  primary:
    "bg-[#0d9488] text-white hover:bg-[#0f766e] shadow-md hover:shadow-lg",
  accent:
    "bg-[#f43f5e] text-white hover:bg-[#e11d48] shadow-md hover:shadow-lg",
  outline:
    "border-2 border-[#0d9488] text-[#0d9488] bg-transparent hover:bg-[#0d9488] hover:text-white",
} as const

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  )
}
