import { auth } from "@/auth";

export async function currentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user?.id || !user.email) {
    throw new Error("Unauthorized");
  }
  return { ...user, id: user.id, email: user.email };
}
