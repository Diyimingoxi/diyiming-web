import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string', validation: r => r.required().max(110)}),
    defineField({name: 'slug', title: 'Dirección del artículo', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'excerpt', title: 'Resumen', type: 'text', rows: 3, validation: r => r.required().max(240)}),
    defineField({name: 'coverImage', title: 'Imagen de portada', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Texto alternativo', type: 'string', validation: r => r.required()}]}),
    defineField({name: 'author', title: 'Autor', type: 'reference', to: [{type: 'teamMember'}]}),
    defineField({name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({
      name: 'body', title: 'Contenido', type: 'array',
      of: [defineArrayMember({type: 'block'}), defineArrayMember({type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Texto alternativo', type: 'string'}]})],
      validation: r => r.required(),
    }),
    defineField({name: 'published', title: 'Publicar en la web', type: 'boolean', initialValue: false}),
  ],
  orderings: [{title: 'Más recientes', name: 'dateDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'excerpt', media: 'coverImage'}},
})
