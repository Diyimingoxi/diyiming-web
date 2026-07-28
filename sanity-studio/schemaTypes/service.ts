import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Nombre', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Identificador', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'category', title: 'Categoría', type: 'string'}),
    defineField({name: 'summary', title: 'Descripción breve', type: 'text', rows: 3, validation: r => r.required().max(260)}),
    defineField({name: 'order', title: 'Orden', type: 'number', initialValue: 10}),
    defineField({name: 'active', title: 'Visible en la web', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Orden de la web', name: 'webOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category'}},
})
