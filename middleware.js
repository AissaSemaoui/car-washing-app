import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
    });
  }
}
