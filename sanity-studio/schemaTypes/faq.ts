import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Preguntas frecuentes',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Respuesta', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Sección', type: 'string', initialValue: 'oxi', options: {list: [
      {title: 'Obras por Impuestos', value: 'oxi'}, {title: 'Servicios', value: 'services'}, {title: 'Contacto', value: 'contact'},
    ]}}),
    defineField({name: 'order', title: 'Orden', type: 'number', initialValue: 10}),
    defineField({name: 'active', title: 'Visible', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'question', subtitle: 'category'}},
})
