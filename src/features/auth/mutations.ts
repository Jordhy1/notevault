"use server";

import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "./password";
import { registerSchema } from "./validators";

export async function registerWithPassword(input: { name: string; email: string; password: string }) {
  const data = registerSchema.parse(input);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("An account with this email already exists");

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: await hashPassword(data.password),
    },
  });
}
