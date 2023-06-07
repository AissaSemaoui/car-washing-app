import { NextResponse } from "next/server";

export async function middleware(request) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append("Access-Control-Allow-Methods", "*");
    response.headers.append("Access-Control-Allow-Headers", "*");
    response.headers.append("Access-Control-Allow-Credentials", "true");
    response.headers.append("Access-Control-Max-Age", "86400");
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
    });
  }

  return response;
}
