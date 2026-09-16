import { auth } from "@/auth";

const AUTH_PAGES = ["/login", "/register"];

export default auth((req) => {
  const isAuthPage = AUTH_PAGES.includes(req.nextUrl.pathname);

  if (!req.auth && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
  if (req.auth && isAuthPage) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
