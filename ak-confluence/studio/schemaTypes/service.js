import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'details', title: 'Service details'},
    {name: 'website', title: 'Website'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'overview',
      options: {source: 'title', maxLength: 96},
        validation: (rule) => rule.custom((slug, context) => {
        if (!slug?.current) return true
        return context.getClient({apiVersion: '2024-01-01'}).fetch(
          '*[_type == "service" && slug.current == $slug && _id != $id][0]._id',
          {slug: slug.current, id: context.document?._id?.replace(/^drafts\./, '')}
        ).then((id) => id ? 'This service URL is already in use.' : true)
      }),
    }),
    defineField({
      name: 'desc',
      title: 'Short description',
      type: 'text',
      rows: 2,
      group: 'overview',
    }),
    defineField({
      name: 'body',
      title: 'Full service content',
      type: 'array',
      group: 'details',
      of: [{type: 'block'}, {
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
          defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
        ],
        validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true),
      }],
      description: 'Optional details shown on the service page.',
    }),
    defineField({
      name: 'intendedAudience',
      title: 'Intended audience',
      type: 'text',
      rows: 3,
      group: 'details',
    }),
    defineField({
      name: 'concerns',
      title: 'Concerns or goals addressed',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'details',
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to expect',
      type: 'text',
      rows: 5,
      group: 'details',
    }),
    defineField({
      name: 'sessionDuration',
      title: 'Session duration (optional)',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'sessionDurationUnit',
      title: 'Duration unit',
      type: 'string',
      group: 'details',
      options: {list: [{title: 'Minutes', value: 'minutes'}, {title: 'Hours', value: 'hours'}]},
      hidden: ({document}) => !document?.sessionDuration,
    }),
    defineField({
      name: 'feesAndPayment',
      title: 'Fees and payment information (optional)',
      type: 'text',
      rows: 4,
      group: 'details',
      description: 'Only enter current, approved public information.',
    }),
    defineField({
      name: 'inPersonAvailable',
      title: 'Available in person',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'telehealthAvailable',
      title: 'Available by telehealth',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'Related FAQs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faq'}]}],
      group: 'details',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Consultation button label',
      type: 'string',
      group: 'website',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Consultation or booking URL',
      type: 'url',
      group: 'website',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      group: 'overview',
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
      ],
      validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true),
      description:
        'Optional. When set, this photo fills the card behind the text. Leave blank to keep the animated logo look. Drag the focal point so the important part stays visible when cropped.',
    }),
    defineField({
      name: 'layout',
      title: 'Card size / style',
      type: 'string',
      group: 'overview',
      description: 'Controls how big the card is in the grid. Keep a mix for the best layout.',
      options: {
        list: [
          {title: 'Wide (large, light blue)', value: 'wide'},
          {title: 'Tall (narrow, warm beige)', value: 'tall'},
          {title: 'Dark (black background)', value: 'dark'},
          {title: 'Light (white background)', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'website',
      description: 'Lower numbers appear first.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'websiteVisible',
      title: 'Show on website',
      type: 'boolean',
      group: 'website',
      initialValue: true,
      description: 'Hidden services stay in Sanity and are excluded from public pages.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'desc', media: 'image'},
  },
})
