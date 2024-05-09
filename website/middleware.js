import getSession from "@/lib/actions/get-session";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const [address, _] = await getSession();

  if (address == null) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/action/:path*",
};
