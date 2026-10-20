import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Getting started', value: 'getting-started'},
          {title: 'Services', value: 'services'},
          {title: 'Office and sessions', value: 'office'},
          {title: 'Payment', value: 'payment'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      description: 'Optional. Select services this answer applies to.',
    }),
    defineField({name: 'websiteVisible', title: 'Show on website', type: 'boolean', initialValue: true}),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question', subtitle: 'category'}},
})