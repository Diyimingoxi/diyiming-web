import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner', title: 'Aliado o entidad', type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'logo', title: 'Logotipo', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required(), fields: [defineField({name: 'alt', title: 'Descripción de la imagen', type: 'string'})]}),
    defineField({name: 'website', title: 'Sitio web (opcional)', type: 'url'}),
    defineField({name: 'order', title: 'Orden de aparición', description: 'Use 1 para el primero, 2 para el segundo, y así sucesivamente.', type: 'number', initialValue: 100, validation: (Rule) => Rule.required().integer().min(1)}),
    defineField({name: 'active', title: 'Mostrar en la web', description: 'Desactívelo para ocultar el aliado sin eliminarlo.', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Orden de aparición', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'logo', active: 'active', order: 'order'}, prepare: ({title, media, active, order}) => ({title, media, subtitle: `${String(order ?? '—').padStart(2, '0')} · ${active === false ? 'Oculto' : 'Visible'}`})},
})
