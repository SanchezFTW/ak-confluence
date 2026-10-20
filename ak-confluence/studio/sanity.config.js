import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETONS = ['siteSettings', 'homePage']

const documentList = (S, type, title) =>
  S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title))

const structure = (S) =>
  S.list()
    .title('AK Confluence')
    .items([
      S.listItem().title('Website').child(S.list().title('Website').items([
        S.listItem().title('Homepage').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
        documentList(S, 'page', 'Pages'),
      ])),
      S.divider(),
      S.listItem().title('Practice').child(S.list().title('Practice').items([
        documentList(S, 'counselor', 'Counselors'),
        documentList(S, 'service', 'Services'),
        documentList(S, 'workshop', 'Workshops'),
        documentList(S, 'faq', 'FAQs'),
        documentList(S, 'providerEndorsement', 'Provider Endorsements'),
      ])),
      S.listItem().title('Publishing').child(S.list().title('Publishing').items([
        documentList(S, 'post', 'Articles & Newsletter'),
      ])),
      S.listItem().title('Settings').child(S.list().title('Settings').items([
        S.listItem().title('Site Defaults & SEO').id('siteSettings').child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      ])),
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
