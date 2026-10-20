import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'homepage', title: 'Homepage', default: true},
    {name: 'navigation', title: 'Navigation and footer'},
    {name: 'contact', title: 'Contact and office'},
    {name: 'newsletter', title: 'Newsletter signup'},
    {name: 'announcement', title: 'Announcement'},
    {name: 'metadata', title: 'Search and social'},
  ],
  // Singleton — there should only ever be one of these. The Studio structure
  // hides the "create new" action so the client always edits this same document.
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Homepage background photo',
      type: 'image',
      options: {hotspot: true},
      group: 'homepage',
      description:
        'The large faded photo behind the homepage headline. Landscape / wide photos work best. Leave blank to use the default.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Homepage intro sentence',
      type: 'text',
      rows: 2,
      group: 'homepage',
      description: 'The short paragraph under the main headline. Leave blank to use the default.',
    }),
    defineField({
      name: 'heroWords',
      title: 'Rotating headline words',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'homepage',
      description:
        'The words that cycle in the headline "Finding your way back to ___" (e.g. Clarity, Connection, Wholeness). Leave blank to use the defaults.',
    }),
    defineField({
      name: 'headerNavigation',
      title: 'Header links',
      type: 'array',
      of: [{type: 'siteLink'}],
      group: 'navigation',
      description: 'Choose an internal page or enter an external, email, or phone destination.',
    }),
    defineField({name: 'primaryConsultationLink', title: 'Primary consultation button', type: 'siteLink', group: 'navigation'}),
    defineField({
      name: 'footerLinkGroups',
      title: 'Footer link groups',
      type: 'array',
      group: 'navigation',
      of: [{type: 'object', fields: [
        defineField({name: 'title', title: 'Group title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'links', title: 'Links', type: 'array', of: [{type: 'siteLink'}]}),
      ]}],
    }),
    defineField({name: 'publicPhone', title: 'Public phone', type: 'string', group: 'contact'}),
    defineField({name: 'publicEmail', title: 'Public email', type: 'email', group: 'contact'}),
    defineField({
      name: 'officeAddress',
      title: 'Office address',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({name: 'street', title: 'Street address', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'region', title: 'State or region', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal code', type: 'string'}),
      ],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office hours',
      type: 'array',
      group: 'contact',
      of: [{type: 'object', fields: [
        defineField({name: 'days', title: 'Days', type: 'string'}),
        defineField({name: 'opens', title: 'Opens', type: 'string'}),
        defineField({name: 'closes', title: 'Closes', type: 'string'}),
      ]}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [{type: 'object', fields: [
        defineField({name: 'platform', title: 'Platform', type: 'string', options: {list: ['Facebook', 'Instagram', 'LinkedIn', 'Other']}}),
        defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
      ]}],
    }),
    defineField({name: 'contactIntroduction', title: 'Contact page introduction', type: 'text', rows: 4, group: 'contact'}),
    defineField({name: 'newsletterHeading', title: 'Newsletter heading', type: 'string', group: 'newsletter'}),
    defineField({name: 'newsletterCopy', title: 'Newsletter description', type: 'text', rows: 3, group: 'newsletter'}),
    defineField({name: 'newsletterConfirmation', title: 'Newsletter confirmation', type: 'string', group: 'newsletter'}),
    defineField({name: 'footerTagline', title: 'Footer tagline', type: 'text', rows: 2, group: 'navigation'}),
    defineField({
      name: 'announcement',
      title: 'Sitewide announcement',
      type: 'object',
      group: 'announcement',
      fields: [
        defineField({name: 'enabled', title: 'Enable announcement', type: 'boolean', initialValue: false}),
        defineField({name: 'message', title: 'Message', type: 'string', hidden: ({parent}) => !parent?.enabled}),
        defineField({name: 'link', title: 'Optional link', type: 'siteLink', hidden: ({parent}) => !parent?.enabled}),
        defineField({name: 'startsAt', title: 'Start time', type: 'datetime', hidden: ({parent}) => !parent?.enabled}),
        defineField({name: 'endsAt', title: 'End time', type: 'datetime', hidden: ({parent}) => !parent?.enabled}),
      ],
      validation: (rule) => rule.custom((value) => {
        if (!value?.enabled) return true
        if (!value.message?.trim()) return 'Enter announcement text before enabling it.'
        if (value.startsAt && value.endsAt && new Date(value.endsAt) <= new Date(value.startsAt)) return 'The end time must be after the start time.'
        return true
      }),
    }),
    defineField({name: 'defaultSeo', title: 'Default search and social metadata', type: 'seo', group: 'metadata'}),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
