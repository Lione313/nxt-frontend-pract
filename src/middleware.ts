import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas (no requieren autenticación)
  const publicRoutes = ["/", "/login", "/register"];

  // Si está en ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Intentar obtener token de localStorage (cliente) o cookies
  // Como middleware corre en el servidor, chequeamos cookies
  const token = request.cookies.get("auth_token")?.value;

  console.log("🔍 Middleware - Ruta:", pathname);
  console.log("🔍 Middleware - Token:", token ? "Existe" : "No existe");

  // Si no hay token y está intentando acceder a ruta protegida
  if (!token && pathname.startsWith("/dashboard")) {
    console.log("❌ Sin token, redirigiendo a login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, permitir acceso
  console.log("✅ Con token, permitiendo acceso");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match todas las rutas excepto:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};