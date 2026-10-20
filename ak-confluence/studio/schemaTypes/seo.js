import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'Search and social metadata',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.warning().max(60)}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.warning().max(160)}),
    defineField({name: 'image', title: 'Social sharing image', type: 'image', options: {hotspot: true}}),
  ],
})