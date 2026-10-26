import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seoDefaults',
  title: 'SEO & Social Defaults',
  type: 'document',
  description: 'Site-wide search and social defaults, plus page-level SEO for the main pages.',
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'string'}),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO title & description',
      type: 'seo',
      description: 'Used when a page has no SEO of its own.',
    }),
    defineField({
      name: 'defaultShareImage',
      title: 'Default social sharing image',
      type: 'image',
      options: {hotspot: true},
      description: 'The image used when a page or article is shared and has no image of its own.',
    }),
    defineField({name: 'homeSeo', title: 'Homepage SEO', type: 'seo'}),
    defineField({name: 'counselorsSeo', title: 'Counselors SEO', type: 'seo'}),
    defineField({name: 'concernsSeo', title: 'Concerns ("What therapy might I need?") SEO', type: 'seo'}),
    defineField({name: 'newsletterSeo', title: 'Newsletter SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'SEO & Social Defaults'})},
})
