import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'diyiming',
  title: 'DIYIMING Consultores',
  projectId: 'rlacne6j',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {types: schemaTypes},
  document: {
    actions: (prev, context) =>
      context.schemaType === 'lead'
        ? prev.filter(({action}) => action !== 'publish' && action !== 'unpublish')
        : prev,
  },
})
