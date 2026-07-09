import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — there should only ever be one of these. The Studio structure
  // hides the "create new" action so the client always edits this same document.
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Homepage background photo',
      type: 'image',
      options: {hotspot: true},
      description:
        'The large faded photo behind the homepage headline. Landscape / wide photos work best. Leave blank to use the default.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Homepage intro sentence',
      type: 'text',
      rows: 2,
      description: 'The short paragraph under the main headline. Leave blank to use the default.',
    }),
    defineField({
      name: 'heroWords',
      title: 'Rotating headline words',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description:
        'The words that cycle in the headline "Finding your way back to ___" (e.g. Clarity, Connection, Wholeness). Leave blank to use the defaults.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
