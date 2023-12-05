import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
    if (request.nextUrl.pathname.startsWith("/Admin") && request.nextauth.token?.role !== "administrador") {
      return NextResponse.rewrite(new URL("/NoAutorizado", request.url))
    }
    if (request.nextUrl.pathname.startsWith("/Vendedor") && request.nextauth.token?.role === "comprador") {
      return NextResponse.rewrite(new URL("/NoAutorizado", request.url))
    }
  },
  {
    callbacks: {
      ///authorized : ({ token }) => token?.role === "Admin" || token?.role === "Vendedor"
      authorized: ({ token }) => !!token
    },

  }
)
export const config = {
  matcher: ["//:path*", "/Carrito/:path*", "/Perfil/:path*", "/Usuario/:path*", "/Ventas/:path*", "/Vendedor/:path*", "/Admin/:path*"],
};