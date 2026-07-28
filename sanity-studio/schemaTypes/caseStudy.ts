import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Caso de éxito',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Nombre del proyecto', type: 'string', validation: r => r.required()}),
    defineField({name: 'sector', title: 'Sector', type: 'string', validation: r => r.required()}),
    defineField({name: 'location', title: 'Ubicación', type: 'string'}),
    defineField({name: 'summary', title: 'Descripción', type: 'text', rows: 4, validation: r => r.required()}),
    defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Texto alternativo', type: 'string'}]}),
    defineField({name: 'published', title: 'Autorizado para publicar', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Orden', type: 'number', initialValue: 10}),
  ],
  orderings: [{title: 'Orden de la web', name: 'webOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'sector', media: 'image'}},
})
