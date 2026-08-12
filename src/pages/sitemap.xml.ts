import type { APIRoute } from "astro";
import { getPosts } from "../lib/sanity";

export const GET: APIRoute = async ({ site, url }) => {
  const base = site || new URL(url.origin);
  const fixed = ["", "nosotros", "gestion-oxi", "comercializacion-ciprl", "capacitacion-especializada", "obras-por-impuestos", "experiencia", "blog", "contacto"];
  const posts = await getPosts(100);
  const urls = [
    ...fixed.map(path => new URL(`/${path}`, base).href),
    ...posts.map(post => new URL(`/blog/${post.slug}`, base).href)
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(item => `  <url><loc>${item}</loc></url>`).join("\n")}\n</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
