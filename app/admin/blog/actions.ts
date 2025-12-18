"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Blog Post Actions
export async function getBlogPosts(options?: {
  published?: boolean;
  featured?: boolean;
  categoryId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (options?.published !== undefined) {
    where.published = options.published;
  }
  if (options?.featured !== undefined) {
    where.featured = options.featured;
  }
  if (options?.categoryId) {
    where.categoryId = options.categoryId;
  }
  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: "insensitive" } },
      { excerpt: { contains: options.search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
      orderBy: { createdAt: "desc" },
      take: options?.limit,
      skip: options?.offset,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total };
}

export async function getBlogPost(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
    },
  });
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  categoryId?: string;
  tagIds?: string[];
}) {
  const { tagIds, ...postData } = data;

  await prisma.blogPost.create({
    data: {
      ...postData,
      publishedAt: data.published ? new Date() : null,
      tags: tagIds
        ? {
            connect: tagIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    published?: boolean;
    featured?: boolean;
    categoryId?: string | null;
    tagIds?: string[];
  }
) {
  const { tagIds, ...postData } = data;

  // If publishing for the first time, set publishedAt
  const existingPost = await prisma.blogPost.findUnique({ where: { id } });
  const updateData: typeof postData & { publishedAt?: Date | null } = {
    ...postData,
  };

  if (data.published && !existingPost?.publishedAt) {
    updateData.publishedAt = new Date();
  } else if (data.published === false) {
    updateData.publishedAt = null;
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...updateData,
      tags: tagIds
        ? {
            set: tagIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function incrementBlogViews(slug: string) {
  await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}

// Blog Category Actions
export async function getBlogCategories() {
  return prisma.blogCategory.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function createBlogCategory(data: {
  name: string;
  slug: string;
  description?: string;
}) {
  await prisma.blogCategory.create({ data });
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
}

export async function updateBlogCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
  }
) {
  await prisma.blogCategory.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
}

export async function deleteBlogCategory(id: string) {
  await prisma.blogCategory.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
}

// Blog Tag Actions
export async function getBlogTags() {
  return prisma.blogTag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function createBlogTag(data: { name: string; slug: string }) {
  await prisma.blogTag.create({ data });
  revalidatePath("/admin/blog");
}

export async function deleteBlogTag(id: string) {
  await prisma.blogTag.delete({ where: { id } });
  revalidatePath("/admin/blog");
}
