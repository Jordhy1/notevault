import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";
import { unstable_cache } from "next/cache";

const noteInclude = {
  collection: true,
  tags: { include: { tag: true } },
} as const;

export async function getNotes() {
  const user = await requireUser();
  return unstable_cache(
    () => prisma.note.findMany({ where: { userId: user.id }, include: noteInclude, orderBy: { updatedAt: "desc" } }),
    ["notes", user.id, "all"],
    { tags: [`notes:${user.id}`], revalidate: 60 },
  )();
}

export async function getNoteById(id: string) {
  const user = await requireUser();
  return prisma.note.findFirst({
    where: { id, userId: user.id },
    include: noteInclude,
  });
}

export async function getRecentNotes() {
  const user = await requireUser();
  return unstable_cache(
    () => prisma.note.findMany({ where: { userId: user.id }, include: noteInclude, orderBy: [{ lastOpenedAt: "desc" }, { updatedAt: "desc" }], take: 20 }),
    ["notes", user.id, "recent"],
    { tags: [`notes:${user.id}`], revalidate: 30 },
  )();
}

export async function getFavoriteNotes() {
  const user = await requireUser();
  return unstable_cache(
    () => prisma.note.findMany({ where: { userId: user.id, isFavorite: true }, include: noteInclude, orderBy: { updatedAt: "desc" } }),
    ["notes", user.id, "favorites"],
    { tags: [`notes:${user.id}`], revalidate: 60 },
  )();
}

export async function getPinnedNotes() {
  const user = await requireUser();
  return unstable_cache(
    () => prisma.note.findMany({ where: { userId: user.id, isPinned: true }, include: noteInclude, orderBy: { updatedAt: "desc" } }),
    ["notes", user.id, "pinned"],
    { tags: [`notes:${user.id}`], revalidate: 60 },
  )();
}
