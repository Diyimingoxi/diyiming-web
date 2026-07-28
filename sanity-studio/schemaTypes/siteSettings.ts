import {defineField, defineType} from 'sanity'

const editableImage = (name: string, title: string, group: string) =>
  defineField({
    name, title, type: 'image', group, options: {hotspot: true},
    fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
  })

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración general',
  type: 'document',
  groups: [
    {name: 'home', title: 'Inicio', default: true},
    {name: 'company', title: 'Empresa'},
    {name: 'contact', title: 'Contacto'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'companyName', title: 'Nombre de la empresa', type: 'string', group: 'company'}),
    defineField({name: 'footerDescription', title: 'Descripción del pie de página', type: 'text', rows: 3, group: 'company'}),
    defineField({name: 'heroEyebrow', title: 'Etiqueta del inicio', type: 'string', group: 'home'}),
    defineField({name: 'heroTitle', title: 'Título principal', type: 'text', rows: 3, group: 'home'}),
    defineField({name: 'heroDescription', title: 'Descripción principal', type: 'text', rows: 3, group: 'home'}),
    editableImage('heroImage', 'Fotografía principal', 'home'),
    defineField({name: 'heroPrimaryLabel', title: 'Texto del botón principal', type: 'string', group: 'home'}),
    defineField({name: 'heroSecondaryLabel', title: 'Texto del botón secundario', type: 'string', group: 'home'}),
    defineField({name: 'aboutTitle', title: 'Título: acerca de Diyiming', type: 'string', group: 'company'}),
    defineField({name: 'aboutText', title: 'Texto: acerca de Diyiming', type: 'text', rows: 4, group: 'company'}),
    defineField({name: 'aboutDetail', title: 'Texto complementario', type: 'text', rows: 4, group: 'company'}),
    editableImage('aboutImage', 'Fotografía institucional', 'company'),
    defineField({name: 'aboutChecklist', title: 'Atributos destacados', type: 'array', group: 'company', of: [{type: 'string'}], validation: (Rule) => Rule.max(6)}),
    defineField({name: 'trustItems', title: 'Indicadores de confianza', type: 'array', group: 'home', of: [{type: 'object', fields: [
      defineField({name: 'title', title: 'Título', type: 'string'}),
      defineField({name: 'description', title: 'Descripción', type: 'string'}),
    ]}]}),
    defineField({name: 'processSteps', title: 'Proceso de trabajo', type: 'array', group: 'home', of: [{type: 'object', fields: [
      defineField({name: 'title', title: 'Etapa', type: 'string'}),
      defineField({name: 'description', title: 'Descripción', type: 'string'}),
    ]}]}),
    defineField({name: 'ctaTitle', title: 'Llamado a la acción', type: 'string', group: 'home'}),
    defineField({name: 'ctaLabel', title: 'Texto del botón', type: 'string', group: 'home'}),
    defineField({name: 'email', title: 'Correo de contacto', type: 'string', group: 'contact'}),
    defineField({name: 'phone', title: 'Teléfono', type: 'string', group: 'contact'}),
    defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string', group: 'contact'}),
    defineField({name: 'address', title: 'Dirección', type: 'string', group: 'contact'}),
    defineField({name: 'contactHours', title: 'Horario o modalidad de atención', type: 'string', group: 'contact'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'contact'}),
    defineField({name: 'facebook', title: 'Facebook', type: 'url', group: 'contact'}),
    defineField({name: 'seoTitle', title: 'Título SEO', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescription', title: 'Descripción SEO', type: 'text', rows: 3, group: 'seo'}),
    editableImage('socialImage', 'Imagen para compartir en redes', 'seo'),
  ],
  preview: {prepare: () => ({title: 'Configuración general de DIYIMING'})},
})
