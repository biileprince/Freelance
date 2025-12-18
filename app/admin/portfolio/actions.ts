"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Portfolio Project Actions
export async function getPortfolioProjects(options?: {
  published?: boolean;
  featured?: boolean;
  category?: string;
  search?: string;
}) {
  const where: {
    published?: boolean;
    featured?: boolean;
    category?: string;
    OR?:
      | { title: { contains: string; mode: "insensitive" } }[]
      | { description: { contains: string; mode: "insensitive" } }[];
  } = {};

  if (options?.published !== undefined) {
    where.published = options.published;
  }
  if (options?.featured !== undefined) {
    where.featured = options.featured;
  }
  if (options?.category) {
    where.category = options.category;
  }
  if (options?.search) {
    where.description = { contains: options.search, mode: "insensitive" };
  }

  const [projects, total] = await Promise.all([
    prisma.portfolioProject.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    prisma.portfolioProject.count({ where }),
  ]);

  return { projects, total };
}

export async function getPortfolioProject(id: string) {
  return prisma.portfolioProject.findUnique({
    where: { id },
  });
}

export async function getPortfolioProjectBySlug(slug: string) {
  return prisma.portfolioProject.findUnique({
    where: { slug },
  });
}

export async function createPortfolioProject(data: {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  coverImage?: string;
  images?: string;
  category?: string;
  technologies?: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  published?: boolean;
  completedAt?: Date;
}) {
  await prisma.portfolioProject.create({
    data,
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  redirect("/admin/portfolio");
}

export async function updatePortfolioProject(
  id: string,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    content?: string;
    coverImage?: string;
    images?: string;
    category?: string;
    technologies?: string;
    client?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    published?: boolean;
    completedAt?: Date | null;
  }
) {
  const project = await prisma.portfolioProject.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  revalidatePath(`/work/${project.slug}`);
  redirect("/admin/portfolio");
}

export async function deletePortfolioProject(id: string) {
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
}

export async function getPortfolioCategories() {
  const projects = await prisma.portfolioProject.findMany({
    where: { category: { not: null } },
    select: { category: true },
    distinct: ["category"],
  });

  return projects.map((p) => p.category).filter(Boolean) as string[];
}
