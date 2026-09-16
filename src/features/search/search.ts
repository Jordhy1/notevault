import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/session";

export async function searchNotes(query: string) {
  const user = await requireUser();
  const term = query.trim();
  if (!term) return [];
  return prisma.note.findMany({
    where: {
      userId: user.id,
      OR: [
        { title: { contains: term, mode: "insensitive" } },
        { content: { contains: term, mode: "insensitive" } },
        ...( ["GENERAL", "PROMPT", "IDEA", "STUDY", "WORK", "CODE", "BOOKMARK", "TODO", "REFERENCE"].includes(term.toUpperCase()) ? [{ type: term.toUpperCase() as never }] : []),
        { tags: { some: { tag: { name: { contains: term, mode: "insensitive" } } } } },
        { collection: { name: { contains: term, mode: "insensitive" } } },
      ],
    },
    include: { tags: { include: { tag: true } }, collection: true },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
}
