import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {
  HomeIcon,
  UsersIcon,
  UserIcon,
  ThumbsUpIcon,
  SparklesIcon,
  CaseIcon,
  HelpCircleIcon,
  DocumentTextIcon,
  BlockElementIcon,
  ComposeIcon,
} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'

const SINGLETONS = ['siteSettings', 'homePage']

// A list item that opens a document-type list (used for all non-singletons).
// `ordering` sets the default sort editors see in the list view.
const documentList = (S, type, title, icon, ordering) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(type)
    .child(
      S.documentTypeList(type)
        .title(title)
        .defaultOrdering(ordering || [{field: '_updatedAt', direction: 'desc'}]),
    )

// A list item that opens a singleton directly (no intermediate list).
const singleton = (S, type, title, icon, id) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id))

const byDisplayOrder = [{field: 'order', direction: 'asc'}]
const byDateDesc = [{field: 'date', direction: 'desc'}]

const structure = (S) =>
  S.list()
    .title('AK Confluence')
    .items([
      S.listItem().title('Home & Site Info').icon(HomeIcon).child(
        S.list().title('Home & Site Info').items([
          singleton(S, 'homePage', 'Homepage', ComposeIcon, 'homePage'),
          // Navigation & Footer, Contact & Office, Newsletter & Free Guide,
          // Announcement Banner, and SEO & Social Defaults are added here once
          // their singleton document types exist (schema-cleanup phase).
        ]),
      ),
      S.divider(),
      S.listItem().title('Our Team').icon(UsersIcon).child(
        S.list().title('Our Team').items([
          documentList(S, 'counselor', 'Counselors', UserIcon, byDisplayOrder),
          documentList(S, 'providerEndorsement', 'Provider Endorsements', ThumbsUpIcon, byDisplayOrder),
        ]),
      ),
      S.listItem().title('What We Offer').icon(SparklesIcon).child(
        S.list().title('What We Offer').items([
          documentList(S, 'service', 'Services', CaseIcon, byDisplayOrder),
          // Concerns ("Find the words that fit" cards) is added here in the
          // schema-cleanup phase.
          documentList(S, 'faq', 'FAQs', HelpCircleIcon, byDisplayOrder),
        ]),
      ),
      S.listItem().title('Articles & Newsletter').icon(DocumentTextIcon).child(
        S.list().title('Articles & Newsletter').items([
          documentList(S, 'post', 'Articles', BlockElementIcon, byDateDesc),
        ]),
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
