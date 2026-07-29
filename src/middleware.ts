import { defineMiddleware } from "astro:middleware";

const redirects: Record<string, string> = {
  "/index.html": "/",
  "/nosotros.html": "/nosotros",
  "/servicios.html": "/servicios",
  "/obras-por-impuestos.html": "/obras-por-impuestos",
  "/casos.html": "/experiencia",
  "/blog.html": "/blog",
  "/contacto.html": "/contacto"
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.hostname === "www.diyiming.com.pe") {
    const canonical = new URL(context.url);
    canonical.hostname = "diyiming.com.pe";
    return Response.redirect(canonical, 301);
  }

  if (context.url.pathname === "/articulo.html") {
    const slug = context.url.searchParams.get("slug");
    return context.redirect(slug ? `/blog/${encodeURIComponent(slug)}` : "/blog", 301);
  }

  const target = redirects[context.url.pathname];
  if (target) return context.redirect(target, 301);

  const response = await next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
});
