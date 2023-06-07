import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";

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
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  return response;
}
