import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Site Settings is a singleton: one fixed document the client always edits in
// place, rather than a list they can add to.
const SINGLETONS = ['siteSettings']

const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId())
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'AK Confluence',

  projectId: '3gzdej0i',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Hide the global "create" action for singletons.
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },

  document: {
    // Remove "duplicate" / "delete" actions for the singleton document.
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
