import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let locale = request.cookies.get("prismola-locale")?.value;

  if (!locale) {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      if (acceptLanguage.includes("ko")) locale = "ko";
      else if (acceptLanguage.includes("ja")) locale = "ja";
      else if (acceptLanguage.includes("es")) locale = "es";
    }
  }

  locale = locale || "en";

  const response = NextResponse.next();
  response.headers.set("x-prismola-locale", locale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
