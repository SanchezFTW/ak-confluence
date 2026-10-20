import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({name: 'sections', title: 'Homepage sections', type: 'pageSections', description: 'Drag sections to reorder. Existing homepage sections remain as a fallback until this list is published.'}),
    defineField({name: 'seo', title: 'Search and social metadata', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Homepage'})},
})