import type {APIRoute} from 'astro'
import {createClient} from '@sanity/client'
import {apiVersion, dataset, projectId} from '../../lib/sanity'

export const prerender = false

type RuntimeEnv = {
  SANITY_WRITE_TOKEN?: string
  LEADS_NOTIFICATION_EMAIL?: string
  RESEND_API_KEY?: string
  LEADS_FROM_EMAIL?: string
  TURNSTILE_SECRET_KEY?: string
}

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, max) : ''

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const POST: APIRoute = async ({request, locals}) => {
  try {
    const env = (((locals as unknown as {runtime?: {env?: RuntimeEnv}}).runtime?.env) || {}) as RuntimeEnv
    const body = await request.json()

    if (text(body.website, 200)) {
      return Response.json({ok: true})
    }

    const name = text(body.name, 120)
    const company = text(body.company, 160)
    const email = text(body.email, 180).toLowerCase()
    const phone = text(body.phone, 40)
    const interest = text(body.interest, 120)
    const message = text(body.message, 2500)
    const consent = body.consent === true

    if (!name || !emailPattern.test(email) || !message || !consent) {
      return Response.json({ok: false, message: 'Revise los campos obligatorios e inténtelo nuevamente.'}, {status: 400})
    }

    if (env.TURNSTILE_SECRET_KEY) {
      const turnstile = text(body.turnstileToken, 3000)
      if (!turnstile) {
        return Response.json({ok: false, message: 'Complete la verificación de seguridad.'}, {status: 400})
      }
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({secret: env.TURNSTILE_SECRET_KEY, response: turnstile}),
      })
      const result = await verification.json() as {success?: boolean}
      if (!result.success) {
        return Response.json({ok: false, message: 'No pudimos validar la solicitud. Actualice la página e inténtelo otra vez.'}, {status: 400})
      }
    }

    if (!env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured')
      return Response.json({ok: false, message: 'El formulario está temporalmente en configuración. Escríbanos al correo indicado.'}, {status: 503})
    }

    const client = createClient({
      projectId, dataset, apiVersion, useCdn: false, token: env.SANITY_WRITE_TOKEN,
    })

    const createdAt = new Date().toISOString()
    const id = `drafts.lead-${crypto.randomUUID()}`
    await client.create({
      _id: id,
      _type: 'lead',
      createdAt,
      name,
      company,
      email,
      phone,
      interest,
      message,
      status: 'new',
      source: 'Formulario web',
      page: text(body.page, 300),
      consent: true,
    })

    if (env.RESEND_API_KEY && env.LEADS_NOTIFICATION_EMAIL && env.LEADS_FROM_EMAIL) {
      const safe = (value: string) => value.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
      })[char] || char)
      const notification = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {'content-type': 'application/json', authorization: `Bearer ${env.RESEND_API_KEY}`},
        body: JSON.stringify({
          from: env.LEADS_FROM_EMAIL,
          to: [env.LEADS_NOTIFICATION_EMAIL],
          reply_to: email,
          subject: `Nueva consulta web: ${name}${company ? ` — ${company}` : ''}`,
          html: `<h2>Nueva consulta desde diyiming.pe</h2>
            <p><strong>Nombre:</strong> ${safe(name)}</p>
            <p><strong>Empresa:</strong> ${safe(company || 'No indicada')}</p>
            <p><strong>Correo:</strong> ${safe(email)}</p>
            <p><strong>Teléfono:</strong> ${safe(phone || 'No indicado')}</p>
            <p><strong>Interés:</strong> ${safe(interest)}</p>
            <p><strong>Mensaje:</strong><br>${safe(message)}</p>
            <p>La consulta quedó registrada en Sanity Studio para su seguimiento.</p>`,
        }),
      })
      if (!notification.ok) console.error('Lead saved, but notification email failed', await notification.text())
    }

    return Response.json({ok: true, message: 'Gracias. Su consulta fue registrada correctamente.'}, {status: 201})
  } catch (error) {
    console.error('Lead submission failed', error)
    return Response.json({ok: false, message: 'No pudimos registrar la consulta. Inténtelo nuevamente en unos minutos.'}, {status: 500})
  }
}
