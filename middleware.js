import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";

export async function middleware(request) {
  if (request.method === "OPTIONS") {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    return new NextResponse(null, {
      status: 200,
    });
  }
}
