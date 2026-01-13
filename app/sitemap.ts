import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://webaxiom.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Dynamic blog posts
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic portfolio projects
  const portfolioProjects = await prisma.portfolioProject.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true, completedAt: true },
    orderBy: { completedAt: "desc" },
  });

  const portfolioPages = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: project.updatedAt || project.completedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog categories
  const blogCategories = await prisma.blogCategory.findMany({
    select: { slug: true },
  });

  const categoryPages = blogCategories.map((category) => ({
    url: `${SITE_URL}/blog?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages, ...categoryPages];
}
