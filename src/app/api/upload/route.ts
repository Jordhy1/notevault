import { auth } from "@/auth";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ error: "Upload storage is not enabled yet" }, { status: 501 });
}
