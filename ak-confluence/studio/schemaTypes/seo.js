import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'Search and social metadata',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.warning().max(60), description: 'The page title shown in search results. Keep it under 60 characters.'}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.warning().max(160), description: 'The summary shown under the title in search results. Keep it under 160 characters.'}),
    defineField({name: 'image', title: 'Social sharing image', type: 'image', options: {hotspot: true}, description: 'The image shown when this page is shared on social media.'}),
  ],
})