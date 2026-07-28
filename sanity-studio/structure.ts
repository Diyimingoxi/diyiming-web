import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido de la web')
    .items([
      S.listItem()
        .title('Configuración general')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('service').title('Servicios'),
      S.documentTypeListItem('caseStudy').title('Casos de éxito'),
      S.documentTypeListItem('teamMember').title('Equipo directivo'),
      S.documentTypeListItem('post').title('Artículos del blog'),
      S.documentTypeListItem('faq').title('Preguntas frecuentes'),
      S.divider(),
      S.documentTypeListItem('lead').title('Consultas y oportunidades'),
    ])
