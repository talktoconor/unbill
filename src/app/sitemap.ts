import type { MetadataRoute } from "next"
import { hospitals } from "@/data/hospitals"
import { procedures } from "@/data/procedures"
import { blogPosts } from "@/data/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.billfight.co"

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/fight`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/rights`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ]

  const hospitalPages: MetadataRoute.Sitemap = hospitals.map((hospital) => ({
    url: `${baseUrl}/hospitals/${hospital.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const procedurePages: MetadataRoute.Sitemap = procedures.map((procedure) => ({
    url: `${baseUrl}/prices/${procedure.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const landingVariants = ["medical-bill", "er", "uninsured", "charity-care", "collections"]
  const landingPages: MetadataRoute.Sitemap = landingVariants.map((variant) => ({
    url: `${baseUrl}/lp/${variant}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  const seoSlugs = [
    "hca-charity-care",
    "ascension-financial-assistance",
    "commonspirit-charity-care",
    "providence-financial-assistance",
    "kaiser-permanente-financial-assistance",
    "negotiate-er-bill",
    "negotiate-mri-cost",
    "negotiate-surgery-cost",
    "negotiate-childbirth-bill",
    "negotiate-ct-scan-cost",
    "negotiate-california",
    "charity-care-texas",
    "medical-bills-new-york",
    "medical-bills-florida",
    "medical-bills-illinois",
    "negotiate-washington",
    "medical-bills-ohio",
    "medical-bills-pennsylvania",
    "medical-bills-michigan",
    "medical-bills-north-carolina",
    "negotiate-colonoscopy-bill",
    "negotiate-ambulance-bill",
    "negotiate-physical-therapy-cost",
    "negotiate-dental-implant-cost",
    "medical-bills-georgia",
    "medical-bills-arizona",
    "medical-bills-colorado",
    "medical-bills-massachusetts",
    "medical-bills-minnesota",
    "medical-bills-louisiana",
    "negotiate-knee-replacement-cost",
    "negotiate-lab-work-cost",
  ]
  const seoPages: MetadataRoute.Sitemap = seoSlugs.map((slug) => ({
    url: `${baseUrl}/medical-bill/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...hospitalPages,
    ...procedurePages,
    ...blogPages,
    ...landingPages,
    ...seoPages,
  ]
}
