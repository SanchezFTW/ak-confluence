import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description: 'A labeled link or button destination.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The text shown on the link or button.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (rule) => rule.required(),
      description:
        'Where this goes. Use a full address (https://…), a page on this site (/contact), or a section anchor (#counselors).',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
