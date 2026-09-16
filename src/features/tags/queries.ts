import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";

export async function getTags() {
  const user = await requireUser();
  return prisma.tag.findMany({
    where: { userId: user.id },
    include: { _count: { select: { notes: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getTagById(id: string) {
  const user = await requireUser();
  return prisma.tag.findFirst({
    where: { id, userId: user.id },
    include: { notes: { include: { note: true }, orderBy: { note: { updatedAt: "desc" } } } },
  });
}
