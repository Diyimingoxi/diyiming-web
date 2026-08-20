import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner', title: 'Aliado o entidad', type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'logo', title: 'Logotipo', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Descripción de la imagen', type: 'string'})]}),
    defineField({name: 'website', title: 'Sitio web (opcional)', type: 'url'}),
    defineField({name: 'order', title: 'Orden', type: 'number', initialValue: 100}),
    defineField({name: 'active', title: 'Mostrar en la web', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Orden de aparición', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'logo', active: 'active'}, prepare: ({title, media, active}) => ({title, media, subtitle: active === false ? 'Oculto' : 'Visible'})},
})
