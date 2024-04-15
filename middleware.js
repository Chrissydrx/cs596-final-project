import getAddress from "@/lib/actions/getAddress";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const address = await getAddress();

  if (address == null) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/action/:path*",
};
