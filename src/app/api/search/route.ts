import { auth } from "@/auth";
import { searchNotes } from "@/features/search/search";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const query = new URL(request.url).searchParams.get("q") ?? "";
  return Response.json(await searchNotes(query));
}
