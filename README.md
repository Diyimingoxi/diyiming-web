# DIYIMING Consultores

Sitio corporativo de DIYIMING desarrollado con Astro, TypeScript, Sanity CMS y Cloudflare Workers.

## Contenido administrable

El sitio consulta el proyecto de Sanity de la empresa:

- Project ID: `rlacne6j`
- Dataset: `production`

Desde Sanity Studio se pueden publicar y actualizar servicios, casos de experiencia, equipo, artículos e imágenes. Los cambios publicados aparecen en la web sin modificar el código.

## Desarrollo local

Requisitos: Node.js 22 o superior.

```bash
npm install
npm run dev
```

La web estará disponible normalmente en `http://localhost:4321`.

## Verificación

```bash
npm run build
```

Este comando comprueba TypeScript, genera el sitio y prepara la salida para Cloudflare en la carpeta `dist`.

## Publicación automática en Cloudflare

Conecta este repositorio desde **Workers & Pages** y configura:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Cloudflare instalará las dependencias, construirá el proyecto y publicará cada cambio enviado a la rama principal.

## Dominio definitivo

Cuando el dominio esté comprado, agrega en las variables de compilación:

```text
PUBLIC_SITE_URL=https://diyiming.pe
```

Después conecta el dominio en **Cloudflare → Workers & Pages → diyiming-web → Domains**. Esta variable permite que las direcciones canónicas, el sitemap y las tarjetas sociales usen el dominio oficial.

## Estructura

```text
src/
  components/    Componentes reutilizables
  layouts/       Cabecera, pie y metadatos
  lib/           Conexión segura con Sanity
  pages/         Rutas de la web
  styles/        Sistema visual y responsive
public/
  assets/        Fotografías e identidad visual
```

La versión HTML anterior se conserva por separado y no forma parte de esta implementación.
