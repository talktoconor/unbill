import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { CTAButton } from "@/components/cta-button"
import { blogPosts } from "@/data/blog-posts"

// ---------------------------------------------------------------------------
// Simple markdown renderer
// ---------------------------------------------------------------------------

function renderMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let currentList: string[] = []
  let key = 0

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ")
      elements.push(
        <p key={key++} className="text-slate-700 leading-relaxed">
          {renderInline(text)}
        </p>
      )
      currentParagraph = []
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-6 space-y-1 text-slate-700">
          {currentList.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("## ")) {
      flushList()
      flushParagraph()
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-bold text-slate-900 mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith("- ")) {
      flushParagraph()
      currentList.push(trimmed.slice(2))
    } else if (trimmed === "") {
      flushList()
      flushParagraph()
    } else {
      flushList()
      currentParagraph.push(trimmed)
    }
  }

  flushList()
  flushParagraph()

  return elements
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} — BillFight`,
    description: post.excerpt,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#0d9488] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        <Separator className="my-8" />

        {/* Content */}
        <div className="space-y-4">{renderMarkdown(post.content)}</div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-xl bg-[#0d9488] p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Fight Your Medical Bill?
          </h2>
          <p className="mt-3 text-teal-100">
            Generate a professional negotiation letter customized to your
            hospital, procedure, and financial situation.
          </p>
          <div className="mt-6">
            <CTAButton href="/fight" variant="accent" size="lg">
              Get Started &mdash; $49
            </CTAButton>
          </div>
        </div>
      </article>
    </div>
  )
}
