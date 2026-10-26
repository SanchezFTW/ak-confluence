import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'providerEndorsement',
  title: 'Provider Endorsement',
  type: 'document',
  fields: [
    defineField({name: 'quote', title: 'Provider quote', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({name: 'providerName', title: 'Provider name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'credentials', title: 'Credentials (optional)', type: 'string'}),
    defineField({name: 'organization', title: 'Organization (optional)', type: 'string'}),
    defineField({
      name: 'photo',
      title: 'Photo (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
      ],
      validation: (rule) => rule.warning().custom((image) =>
        image?.asset && !image.alt && !image.decorative
          ? 'Add alternative text or mark this image as decorative.'
          : true
      ),
    }),
    defineField({name: 'website', title: 'Provider website (optional)', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'featured', title: 'Feature on website', type: 'boolean', initialValue: false}),
    defineField({name: 'websiteVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100, validation: (rule) => rule.required()}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'providerName', quote: 'quote', media: 'photo'},
    prepare: ({title, quote, media}) => ({
      title,
      subtitle: quote ? (quote.length > 90 ? `${quote.slice(0, 90)}…` : quote) : undefined,
      media,
    }),
  },
})