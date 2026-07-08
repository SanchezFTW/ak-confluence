import {defineType, defineField} from 'sanity'

const TAG_OPTIONS = [
  'Relationships',
  'Communication',
  'Emotional Wellness',
  'Self-Care',
  'Anxiety',
  'Parenting',
  'Workplace',
]

export default defineType({
  name: 'post',
  title: 'Newsletter Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'The web address for this post. Click "Generate" to make one from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish date',
      type: 'date',
      options: {dateFormat: 'MMMM D, YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'e.g. "Jillian Thony, MFT-A"',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the newsletter list and used for search.',
    }),
    defineField({
      name: 'tags',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: TAG_OPTIONS.map((t) => ({title: t, value: t})),
      },
      description: 'Used by the topic filter pills on the newsletter page.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          // Limit styles to what the site renders: normal paragraphs + H3 headings.
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h3'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
        {type: 'image', options: {hotspot: true}},
      ],
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'coverImage'},
  },
})
