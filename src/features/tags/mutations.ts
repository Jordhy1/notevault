"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";
import { z } from "zod";

const tagSchema = z.object({ name: z.string().trim().min(1).max(50) });

export async function createTag(input: { name: string }) {
  const user = await requireUser();
  const data = tagSchema.parse(input);
  const tag = await prisma.tag.upsert({
    where: { userId_name: { userId: user.id, name: data.name.toLowerCase() } },
    update: {},
    create: { userId: user.id, name: data.name.toLowerCase() },
  });
  revalidatePath("/tags");
  return tag;
}

export async function deleteTag(id: string) {
  const user = await requireUser();
  await prisma.tag.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/tags");
}

export async function renameTag(id: string, input: { name: string }) {
  const user = await requireUser();
  const data = tagSchema.parse(input);
  const result = await prisma.tag.updateMany({ where: { id, userId: user.id }, data: { name: data.name.toLowerCase() } });
  if (!result.count) throw new Error("Tag not found");
  revalidatePath("/tags");
}
