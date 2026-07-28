# DIYIMING: activación del CMS y registro de consultas

## Lo que incluye esta versión

- Contenido editable: portada, imágenes, datos de contacto, servicios, casos, equipo, blog y preguntas frecuentes.
- Registro privado de consultas dentro de Sanity Studio.
- Estados comerciales: nuevo, contactado, oportunidad, propuesta, ganado, no prosperó y spam.
- Responsable, notas y fecha de seguimiento por consulta.
- Formulario sin archivos adjuntos.
- Protección anti-spam opcional con Cloudflare Turnstile.
- Aviso por correo opcional; el registro en Sanity funciona aunque el aviso falle.
- Política de privacidad y consentimiento.

## 1. Publicar el nuevo código

Subir el contenido completo de esta carpeta al repositorio `Diyimingoxi/diyiming-web`. Cloudflare detectará el cambio y ejecutará:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

## 2. Publicar el panel actualizado

Abrir una terminal en `sanity-studio` y ejecutar:

```text
pnpm install
pnpm run deploy
```

Esto actualiza el panel existente; no se crea otro proyecto ni otro dataset.

## 3. Crear el token privado de Sanity

En Sanity Manage, dentro del proyecto DIYIMING CMS:

1. Abrir API → Tokens.
2. Crear un token con permiso de escritura.
3. Copiarlo una sola vez.
4. En Cloudflare → diyiming-web → Settings → Variables and secrets, crear un **Secret**:

```text
SANITY_WRITE_TOKEN
```

Nunca guardar el token en GitHub ni enviarlo por correo.

## 4. Activar protección anti-spam

En Cloudflare → Turnstile, crear un sitio para el dominio. Luego agregar:

```text
TURNSTILE_SITE_KEY       Variable
TURNSTILE_SECRET_KEY     Secret
```

## 5. Activar aviso al correo corporativo

La bandeja de GoDaddy puede seguir recibiendo normalmente. Para enviar avisos automáticos desde la web se configura un servicio transaccional y se agregan:

```text
LEADS_NOTIFICATION_EMAIL=correo-corporativo-de-diyiming
RESEND_API_KEY=clave-privada
LEADS_FROM_EMAIL=Web Diyiming <web@diyiming.pe>
```

El dominio debe estar verificado antes de activar el remitente. Si estas variables todavía no existen, las consultas igual se guardan en Sanity.

## 6. Comprobación final

1. Enviar una consulta de prueba desde `/contacto`.
2. Abrir Sanity Studio → Consultas y oportunidades.
3. Confirmar que aparece como “Nuevo”.
4. Cambiar el estado a “Contactado”, agregar responsable y una nota.
5. Confirmar que el correo de aviso llegó cuando esa opción esté activada.

## Seguridad

Las consultas se crean como documentos privados de trabajo y no como contenido público del sitio. La empresa debe revisar la política de privacidad con su asesoría legal antes del lanzamiento definitivo.
