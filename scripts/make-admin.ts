/**
 * Script to make a user an admin
 * Usage: npx tsx scripts/make-admin.ts <email>
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  if (!email) {
    console.error("Usage: npx tsx scripts/make-admin.ts <email>");
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    console.log(`✅ Successfully made ${user.email} an admin!`);
    console.log(`Name: ${user.name || "N/A"}`);
    console.log(`Role: ${user.role}`);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      console.error(`❌ User with email "${email}" not found.`);
    } else {
      console.error("Error:", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
makeAdmin(email);
