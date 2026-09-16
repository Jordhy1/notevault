"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";
import { collectionIdSchema, collectionSchema, type CollectionInput } from "./validators";

export async function createCollection(input: CollectionInput) {
  const user = await requireUser();
  const data = collectionSchema.parse(input);
  const collection = await prisma.collection.create({ data: { ...data, userId: user.id } });
  revalidatePath("/collections");
  return collection;
}

export async function updateCollection(id: string, input: CollectionInput) {
  const user = await requireUser();
  const data = collectionSchema.parse(input);
  const key = collectionIdSchema.parse({ id });
  const result = await prisma.collection.updateMany({ where: { id: key.id, userId: user.id }, data });
  if (!result.count) throw new Error("Collection not found");
  revalidatePath("/collections");
}

export async function deleteCollection(id: string) {
  const user = await requireUser();
  const key = collectionIdSchema.parse({ id });
  await prisma.collection.deleteMany({ where: { id: key.id, userId: user.id } });
  revalidatePath("/collections");
}
