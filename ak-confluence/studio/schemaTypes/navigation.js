import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation & Footer',
  type: 'document',
  description: 'The site-wide header links, the Book Now button, and the footer.',
  groups: [
    {name: 'header', title: 'Header navigation', default: true},
    {name: 'bookNow', title: 'Book Now button'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'navLinks',
      title: 'Header links',
      type: 'array',
      group: 'header',
      of: [{type: 'link'}],
      description: 'The links in the top navigation, in order.',
    }),
    defineField({
      name: 'bookNowLabel',
      title: 'Book Now button label',
      type: 'string',
      group: 'bookNow',
      description: 'The text on the Book Now button (shown on desktop and mobile menus).',
    }),
    defineField({
      name: 'bookNowUrl',
      title: 'Book Now button URL',
      type: 'string',
      group: 'bookNow',
      description: 'The external booking site this button opens.',
    }),
    defineField({
      name: 'bookNowOpenInNewTab',
      title: 'Open Book Now in a new tab',
      type: 'boolean',
      initialValue: true,
      group: 'bookNow',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 2,
      group: 'footer',
      description: 'The short sentence next to the logo in the footer.',
    }),
    defineField({
      name: 'footerLinkGroups',
      title: 'Footer link groups',
      type: 'array',
      group: 'footer',
      description: 'Columns of links shown in the footer.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Group title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'links', title: 'Links', type: 'array', of: [{type: 'link'}]}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Navigation & Footer'})},
})
