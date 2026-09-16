import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";

export async function getCollections() {
  const user = await requireUser();
  return prisma.collection.findMany({
    where: { userId: user.id },
    include: { _count: { select: { notes: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getCollectionById(id: string) {
  const user = await requireUser();
  return prisma.collection.findFirst({
    where: { id, userId: user.id },
    include: { notes: { orderBy: { updatedAt: "desc" }, include: { tags: { include: { tag: true } } } } },
  });
}
