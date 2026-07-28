import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nombre completo', type: 'string', validation: r => r.required()}),
    defineField({name: 'role', title: 'Cargo', type: 'string', validation: r => r.required()}),
    defineField({name: 'bio', title: 'Perfil profesional', type: 'text', rows: 4, validation: r => r.max(450)}),
    defineField({
      name: 'photo',
      title: 'Fotografía',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Descripción de la foto', type: 'string', validation: r => r.required()}),
      ],
      validation: r => r.required(),
    }),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
    defineField({name: 'order', title: 'Orden de aparición', type: 'number', initialValue: 10}),
    defineField({name: 'active', title: 'Mostrar en la web', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Orden de la web', name: 'webOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
