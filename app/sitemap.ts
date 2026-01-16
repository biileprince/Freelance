import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.axiomcraft.dev";

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

  // Blog tags
  const blogTags = await prisma.blogTag.findMany({
    select: { slug: true },
  });

  const tagPages = blogTags.map((tag) => ({
    url: `${SITE_URL}/blog?tag=${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Portfolio categories (E-Commerce, Corporate, Community, Web App, etc.)
  const portfolioCategories = await prisma.portfolioProject.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });

  const portfolioCategoryPages = portfolioCategories
    .filter((p) => p.category)
    .map((project) => ({
      url: `${SITE_URL}/work?category=${encodeURIComponent(project.category!)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // Portfolio technologies (Next.js, React, TypeScript, etc.)
  const portfolioWithTech = await prisma.portfolioProject.findMany({
    where: {
      published: true,
      technologies: { isEmpty: false },
    },
    select: { technologies: true },
  });

  // Extract unique technologies
  const uniqueTechnologies = new Set<string>();
  portfolioWithTech.forEach((project) => {
    project.technologies.forEach((tech) => uniqueTechnologies.add(tech));
  });

  const technologyPages = Array.from(uniqueTechnologies).map((tech) => ({
    url: `${SITE_URL}/work?technology=${encodeURIComponent(tech)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Combined work filters (technology + category)
  const combinedWorkPages: MetadataRoute.Sitemap = [];
  portfolioCategories
    .filter((p) => p.category)
    .forEach((catProject) => {
      Array.from(uniqueTechnologies).forEach((tech) => {
        combinedWorkPages.push({
          url: `${SITE_URL}/work?technology=${encodeURIComponent(
            tech
          )}&category=${encodeURIComponent(catProject.category!)}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        });
      });
    });

  return [
    ...staticPages,
    ...blogPages,
    ...portfolioPages,
    ...categoryPages,
    ...tagPages,
    ...portfolioCategoryPages,
    ...technologyPages,
    ...combinedWorkPages,
  ];
}
