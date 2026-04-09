import { NextResponse, NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  const { userId } = await auth();

  if (pathname.startsWith("/documents") || pathname.endsWith("/use")) {
    if (!userId) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  if (pathname === "/" && userId) {
    return NextResponse.redirect(new URL("/documents", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
