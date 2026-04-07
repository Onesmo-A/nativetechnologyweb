import { NextResponse, type NextRequest } from "next/server";
import { readAdminCookieFromRequest, verifyAdminToken } from "@/lib/adminAuth";

const LOGIN_PATH = "/admin/login";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLogin =
    pathname === LOGIN_PATH || pathname.startsWith("/api/admin/login");

  if (!isAdminPage && !isAdminApi) return NextResponse.next();
  if (isLogin) return NextResponse.next();

  const token = readAdminCookieFromRequest(req);
  if (!token) return deny(req, isAdminApi);

  try {
    await verifyAdminToken(token);
    return NextResponse.next();
  } catch {
    return deny(req, isAdminApi);
  }
}

function deny(req: NextRequest, isApi: boolean) {
  if (isApi) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

