import { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://2nspira.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://2nspira.com/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://2nspira.com/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: "https://2nspira.com/insights", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: "https://2nspira.com/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: "https://2nspira.com/ai-enablement", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://2nspira.com/fractional-cio", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://2nspira.com/websites", lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: "https://2nspira.com/resources", lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: "https://2nspira.com/books", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: "https://2nspira.com/resources/ai-readiness-scorecard", lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: "https://2nspira.com/resources/strength-profile", lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: "https://2nspira.com/blog/categories/trust-is-the-operating-system", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://2nspira.com/post/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts];
}
