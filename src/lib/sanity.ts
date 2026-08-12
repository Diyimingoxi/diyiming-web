import { createClient } from "@sanity/client";

export const projectId = "rlacne6j";
export const dataset = "production";
export const apiVersion = "2026-07-27";

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published"
});

export interface SiteSettings {
  companyName?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  aboutTitle?: string;
  aboutText?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  linkedin?: string;
  facebook?: string;
  contactHours?: string;
  footerDescription?: string;
}

export interface Service {
  title: string;
  category?: string;
  summary: string;
  order?: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  linkedin?: string;
  photoUrl?: string;
  photoAlt?: string;
}

export interface CaseStudy {
  title: string;
  sector?: string;
  location?: string;
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Faq {
  question: string;
  answer: string;
  category?: string;
}

export interface PostSummary {
  title: string;
  excerpt?: string;
  publishedAt?: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface PortableTextSpan {
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  url?: string;
  alt?: string;
}

export interface Post extends PostSummary {
  body?: PortableTextBlock[];
  coverUrl?: string;
  coverAlt?: string;
  author?: {
    name: string;
    role?: string;
    photoUrl?: string;
  };
}

const fallbackSettings: Required<Pick<SiteSettings,
  "companyName" | "heroEyebrow" | "heroTitle" | "heroDescription" |
  "aboutTitle" | "aboutText" | "email" | "address"
>> = {
  companyName: "Diyiming Consultores",
  heroEyebrow: "Consultoría especializada en OxI",
  heroTitle: "Convertimos inversión en infraestructura que genera desarrollo.",
  heroDescription: "Acompañamos a empresas privadas y entidades públicas en la estructuración, gestión y ejecución de proyectos mediante Obras por Impuestos.",
  aboutTitle: "Un aliado estratégico para proyectos que transforman.",
  aboutText: "Diyiming Consultores brinda orientación y apoyo técnico a empresas privadas y entidades públicas que participan en proyectos bajo el mecanismo de Obras por Impuestos.",
  email: "caspiazu@diyiming.pe",
  address: "Calle Luis Medina 176, San Miguel, Ica"
};

async function safeFetch<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  try {
    return (await sanity.fetch<T>(query, params)) ?? fallback;
  } catch (error) {
    console.error("Sanity query failed", error);
    return fallback;
  }
}

export function getSettings() {
  return safeFetch<SiteSettings>(
    `*[_type=="siteSettings" && _id=="siteSettings"][0]{
      companyName,heroEyebrow,heroTitle,heroDescription,aboutTitle,aboutText,
      email,phone,whatsapp,address,contactHours,linkedin,facebook,footerDescription
    }`,
    fallbackSettings
  );
}

export function getServices() {
  return safeFetch<Service[]>(
    `*[_type=="service" && active==true]|order(order asc){title,category,summary,order}`,
    []
  );
}

export function getFaqs(category = "oxi") {
  return safeFetch<Faq[]>(
    `*[_type=="faq" && active==true && category==$category]|order(order asc){question,answer,category}`,
    [],
    {category}
  );
}

export function getCases() {
  return safeFetch<CaseStudy[]>(
    `*[_type=="caseStudy" && published==true]|order(order asc){
      title,sector,location,summary,"imageUrl":image.asset->url,"imageAlt":image.alt
    }`,
    []
  );
}

export function getTeam() {
  return safeFetch<TeamMember[]>(
    `*[_type=="teamMember" && active==true]|order(order asc){
      name,role,bio,linkedin,"photoUrl":photo.asset->url,"photoAlt":photo.alt
    }`,
    []
  );
}

export function getPosts(limit = 12) {
  return safeFetch<PostSummary[]>(
    `*[_type=="post" && published==true]|order(publishedAt desc)[0...$limit]{
      title,excerpt,publishedAt,"slug":slug.current,
      "imageUrl":coverImage.asset->url,"imageAlt":coverImage.alt
    }`,
    [],
    { limit }
  );
}

export function getPost(slug: string) {
  return safeFetch<Post | null>(
    `*[_type=="post" && slug.current==$slug && published==true][0]{
      title,excerpt,publishedAt,"slug":slug.current,
      "coverUrl":coverImage.asset->url,"coverAlt":coverImage.alt,
      "author":author->{name,role,"photoUrl":photo.asset->url},
      body[]{..., _type=="image"=>{"url":asset->url,alt}}
    }`,
    null,
    { slug }
  );
}

export function formatDate(date?: string) {
  if (!date) return "Artículo";
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Lima"
  }).format(new Date(date));
}

export function imageUrl(url?: string, width = 1200) {
  if (!url) return undefined;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=max&w=${width}`;
}
