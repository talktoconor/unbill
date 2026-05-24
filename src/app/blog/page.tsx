import Link from "next/link"
import type { Metadata } from "next"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { blogPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "BillFight Blog — Medical Bill Guides & Tips",
  description:
    "Expert guides on fighting medical bills, understanding your rights, and saving money on healthcare.",
}

export default function BlogIndexPage() {
  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            BillFight Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Expert guides on fighting medical bills, understanding your rights,
            and saving money on healthcare.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#0d9488] transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
