import {defineField, defineType} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage', title: 'Fotografía de proyectos', type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'image', title: 'Fotografía', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required(), fields: [defineField({name: 'alt', title: 'Descripción para accesibilidad', type: 'string', validation: (Rule) => Rule.required()})]}),
    defineField({name: 'caption', title: 'Descripción visible (opcional)', type: 'text', rows: 3}),
    defineField({name: 'category', title: 'Categoría (opcional)', type: 'string'}),
    defineField({name: 'order', title: 'Orden', type: 'number', initialValue: 100}),
    defineField({name: 'active', title: 'Mostrar en la web', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Orden de aparición', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
