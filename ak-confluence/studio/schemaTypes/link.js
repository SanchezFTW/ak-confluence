import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteLink',
  title: 'Website link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Link text', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'document',
      title: 'Internal page or content',
      type: 'reference',
      to: [{type: 'homePage'}, {type: 'page'}, {type: 'service'}, {type: 'post'}, {type: 'workshop'}, {type: 'counselor'}],
    }),
    defineField({name: 'url', title: 'External URL', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'email', title: 'Email address', type: 'email'}),
    defineField({name: 'phone', title: 'Telephone number', type: 'string'}),
    defineField({name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false}),
  ],
  validation: (rule) => rule.custom((value) => {
    if (!value) return true
    const destinations = [value.document, value.url, value.email, value.phone].filter(Boolean).length
    return destinations === 1 ? true : 'Choose exactly one link destination.'
  }),
})