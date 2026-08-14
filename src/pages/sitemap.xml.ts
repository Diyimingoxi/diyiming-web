import type { APIRoute } from "astro";
import { getPosts } from "../lib/sanity";

export const GET: APIRoute = async ({ site, url }) => {
  type SitemapItem = { loc: string; priority: string; changefreq: string; lastmod?: string };
  const base = site || new URL(url.origin);
  const fixed = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "obras-por-impuestos", priority: "1.0", changefreq: "monthly" },
    { path: "gestion-oxi", priority: "0.9", changefreq: "monthly" },
    { path: "comercializacion-ciprl", priority: "0.9", changefreq: "monthly" },
    { path: "capacitacion-especializada", priority: "0.8", changefreq: "monthly" },
    { path: "nosotros", priority: "0.8", changefreq: "monthly" },
    { path: "experiencia", priority: "0.8", changefreq: "monthly" },
    { path: "blog", priority: "0.9", changefreq: "weekly" },
    { path: "contacto", priority: "0.7", changefreq: "monthly" }
  ];
  const posts = await getPosts(100);
  const urls: SitemapItem[] = [
    ...fixed.map(item => ({
      loc: new URL(`/${item.path}`, base).href,
      priority: item.priority,
      changefreq: item.changefreq
    })),
    ...posts.map(post => ({
      loc: new URL(`/blog/${post.slug}`, base).href,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined
    }))
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(item => `  <url><loc>${item.loc}</loc>${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ""}<changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`).join("\n")}\n</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
