"use server";

import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";
import {
  createNoteSchema,
  noteIdSchema,
  updateNoteSchema,
  updateNoteContentSchema,
  updateNoteMetadataSchema,
  type CreateNoteInput,
  type UpdateNoteInput,
} from "./validators";

async function resolveTags(userId: string, tagNames: string[]) {
  return Promise.all(
    [...new Set(tagNames.map((name) => name.toLowerCase()))].map((name) =>
      prisma.tag.upsert({
        where: { userId_name: { userId, name } },
        update: {},
        create: { userId, name },
      }),
    ),
  );
}

async function verifyCollection(userId: string, collectionId?: string | null) {
  if (!collectionId) return null;
  const collection = await prisma.collection.findFirst({ where: { id: collectionId, userId } });
  if (!collection) throw new Error("Collection not found");
  return collection.id;
}

function invalidateNoteCaches(userId: string) {
  revalidateTag(`notes:${userId}`, "max");
  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath("/favorites");
  revalidatePath("/pinned");
  revalidatePath("/recent");
}

export async function createNote(input: CreateNoteInput) {
  const user = await requireUser();
  const data = createNoteSchema.parse(input);
  const collectionId = await verifyCollection(user.id, data.collectionId);
  const tags = await resolveTags(user.id, data.tagNames);

  const note = await prisma.note.create({
    data: {
      userId: user.id,
      title: data.title,
      content: data.content,
      type: data.type,
      collectionId,
      tags: { create: tags.map((tag) => ({ tagId: tag.id })) },
    },
  });
  invalidateNoteCaches(user.id);
  return note;
}

export async function updateNote(input: UpdateNoteInput) {
  const user = await requireUser();
  const data = updateNoteSchema.parse(input);
  const existing = await prisma.note.findFirst({ where: { id: data.id, userId: user.id } });
  if (!existing) throw new Error("Note not found");
  const collectionId = await verifyCollection(user.id, data.collectionId);
  const tags = await resolveTags(user.id, data.tagNames);

  const note = await prisma.$transaction(async (tx) => {
    await tx.noteTag.deleteMany({ where: { noteId: data.id } });
    return tx.note.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        type: data.type,
        collectionId,
        tags: { create: tags.map((tag) => ({ tagId: tag.id })) },
      },
    });
  });
  invalidateNoteCaches(user.id);
  revalidatePath(`/notes/${data.id}`);
  return note;
}

export async function updateNoteContent(input: unknown) {
  const user = await requireUser();
  const data = updateNoteContentSchema.parse(input);
  const existing = await prisma.note.findFirst({ where: { id: data.id, userId: user.id } });
  if (!existing) throw new Error("Note not found");
  const note = await prisma.note.update({ where: { id: data.id }, data: { title: data.title, content: data.content } });
  invalidateNoteCaches(user.id);
  revalidatePath(`/notes/${data.id}`);
  return note;
}

export async function updateNoteMetadata(input: unknown) {
  const user = await requireUser();
  const data = updateNoteMetadataSchema.parse(input);
  const existing = await prisma.note.findFirst({ where: { id: data.id, userId: user.id } });
  if (!existing) throw new Error("Note not found");
  const collectionId = await verifyCollection(user.id, data.collectionId);
  const tags = await resolveTags(user.id, data.tagNames);
  const note = await prisma.$transaction(async (tx) => {
    await tx.noteTag.deleteMany({ where: { noteId: data.id } });
    return tx.note.update({ where: { id: data.id }, data: { type: data.type, collectionId, tags: { create: tags.map((tag) => ({ tagId: tag.id })) } } });
  });
  invalidateNoteCaches(user.id);
  revalidatePath(`/notes/${data.id}`);
  return note;
}

export async function deleteNote(id: string) {
  const user = await requireUser();
  const data = noteIdSchema.parse({ id });
  await prisma.note.deleteMany({ where: { id: data.id, userId: user.id } });
  invalidateNoteCaches(user.id);
}

export async function toggleFavorite(id: string) {
  return toggleNoteFlag(id, "isFavorite");
}

export async function togglePinned(id: string) {
  return toggleNoteFlag(id, "isPinned");
}

async function toggleNoteFlag(id: string, flag: "isFavorite" | "isPinned") {
  const user = await requireUser();
  const note = await prisma.note.findFirst({ where: { id, userId: user.id } });
  if (!note) throw new Error("Note not found");
  const updated = await prisma.note.update({ where: { id }, data: { [flag]: !note[flag] } });
  invalidateNoteCaches(user.id);
  return updated;
}

export async function markNoteOpened(id: string) {
  const user = await requireUser();
  const result = await prisma.note.updateMany({ where: { id, userId: user.id }, data: { lastOpenedAt: new Date() } });
  if (result.count > 0) revalidateTag(`notes:${user.id}`, "max");
}
