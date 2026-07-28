import {defineField, defineType} from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Consultas recibidas',
  type: 'document',
  fields: [
    defineField({name: 'createdAt', title: 'Fecha de ingreso', type: 'datetime', readOnly: true}),
    defineField({name: 'name', title: 'Nombre y apellido', type: 'string', readOnly: true}),
    defineField({name: 'company', title: 'Empresa o entidad', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Correo', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Teléfono', type: 'string', readOnly: true}),
    defineField({name: 'interest', title: 'Motivo de consulta', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Mensaje', type: 'text', rows: 6, readOnly: true}),
    defineField({
      name: 'status', title: 'Estado comercial', type: 'string', initialValue: 'new',
      options: {list: [
        {title: 'Nuevo', value: 'new'}, {title: 'Contactado', value: 'contacted'},
        {title: 'Oportunidad calificada', value: 'qualified'}, {title: 'Propuesta enviada', value: 'proposal'},
        {title: 'Ganado', value: 'won'}, {title: 'No prosperó', value: 'lost'}, {title: 'Spam', value: 'spam'},
      ], layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'assignedTo', title: 'Responsable', type: 'string'}),
    defineField({name: 'notes', title: 'Notas de seguimiento', type: 'text', rows: 5}),
    defineField({name: 'contactedAt', title: 'Fecha del último contacto', type: 'datetime'}),
    defineField({name: 'source', title: 'Origen', type: 'string', readOnly: true}),
    defineField({name: 'page', title: 'Página de origen', type: 'string', readOnly: true}),
    defineField({name: 'consent', title: 'Aceptó el tratamiento de datos', type: 'boolean', readOnly: true}),
  ],
  preview: {
    select: {title: 'name', company: 'company', status: 'status', createdAt: 'createdAt'},
    prepare({title, company, status, createdAt}) {
      const labels: Record<string, string> = {new: 'Nuevo', contacted: 'Contactado', qualified: 'Oportunidad', proposal: 'Propuesta', won: 'Ganado', lost: 'No prosperó', spam: 'Spam'}
      return {title: title || 'Consulta sin nombre', subtitle: [company, labels[status] || status, createdAt && new Date(createdAt).toLocaleDateString('es-PE')].filter(Boolean).join(' · ')}
    },
  },
})
