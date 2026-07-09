import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Short description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description:
        'Optional. When set, this photo fills the card behind the text. Leave blank to keep the animated logo look. Drag the focal point so the important part stays visible when cropped.',
    }),
    defineField({
      name: 'layout',
      title: 'Card size / style',
      type: 'string',
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
      description: 'Lower numbers appear first.',
      validation: (rule) => rule.required(),
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
