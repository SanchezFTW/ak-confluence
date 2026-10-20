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
  groups: [
    {name: 'content', title: 'Article', default: true},
    {name: 'organization', title: 'Organization'},
    {name: 'metadata', title: 'Search and social'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      description: 'The web address for this post. Click "Generate" to make one from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().custom((slug, context) => {
        if (!slug?.current) return 'Generate a URL slug.'
        return context.getClient({apiVersion: '2024-01-01'}).fetch(
          '*[_type == "post" && slug.current == $slug && _id != $id][0]._id',
          {slug: slug.current, id: context.document?._id?.replace(/^drafts\./, '')}
        ).then((id) => id ? 'This article URL is already in use.' : true)
      }),
    }),
    defineField({
      name: 'date',
      title: 'Publish date',
      type: 'date',
      group: 'content',
      options: {dateFormat: 'MMMM D, YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'organization',
      description: 'e.g. "Jillian Thony, MFT-A"',
    }),
    defineField({
      name: 'authorReference',
      title: 'Author profile (optional)',
      type: 'reference',
      to: [{type: 'counselor'}],
      group: 'organization',
      description: 'When selected, the website uses the linked public profile name; the legacy author text remains supported.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.warning().max(200),
      description: 'Short summary shown on the newsletter list and used for search.',
    }),
    defineField({
      name: 'tags',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      group: 'organization',
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
      group: 'content',
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
      ],
      validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'organization',
    }),
    defineField({name: 'relatedServices', title: 'Related services', type: 'array', of: [{type: 'reference', to: [{type: 'service'}]}], group: 'organization'}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [{type: 'reference', to: [{type: 'post'}]}], group: 'organization'}),
    defineField({name: 'featured', title: 'Feature this article', type: 'boolean', group: 'organization', initialValue: false}),
    defineField({name: 'seo', title: 'Search and social metadata', type: 'seo', group: 'metadata'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
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
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
            defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
          ],
          validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true),
        },
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
