import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter & Free Guide',
  type: 'document',
  description: 'The monthly newsletter pop-up and the free Boundaries Blueprint guide.',
  groups: [
    {name: 'monthly', title: 'Monthly newsletter pop-up', default: true},
    {name: 'guide', title: 'Free guide band'},
    {name: 'guidePage', title: 'Free guide page'},
  ],
  fields: [
    defineField({
      name: 'monthlyEnabled',
      title: 'Show the monthly newsletter pop-up',
      type: 'boolean',
      initialValue: true,
      group: 'monthly',
    }),
    defineField({name: 'monthlyHeading', title: 'Heading', type: 'string', group: 'monthly', description: 'For example "Join our newsletter".'}),
    defineField({name: 'monthlySubtitle', title: 'Subtitle', type: 'string', group: 'monthly', description: 'For example "Notes on boundaries, anxiety, and more."'}),
    defineField({name: 'monthlyEmailPlaceholder', title: 'Email placeholder', type: 'string', group: 'monthly'}),
    defineField({name: 'monthlyOptInText', title: 'Opt-in checkbox text', type: 'string', group: 'monthly'}),
    defineField({name: 'monthlyButtonLabel', title: 'Button label', type: 'string', group: 'monthly'}),
    defineField({name: 'monthlySuccessMessage', title: 'Success message', type: 'string', group: 'monthly'}),

    defineField({name: 'guideHeadingLead', title: 'Guide heading (before accent)', type: 'string', group: 'guide', description: 'For example "Get your free".'}),
    defineField({name: 'guideHeadingAccent', title: 'Guide heading italic accent words', type: 'string', group: 'guide', description: 'For example "Boundaries Blueprint".'}),
    defineField({name: 'guideDescription', title: 'Guide description', type: 'text', rows: 3, group: 'guide'}),
    defineField({name: 'guideEmailPlaceholder', title: 'Email placeholder', type: 'string', group: 'guide'}),
    defineField({name: 'guideOptInText', title: 'Opt-in checkbox text', type: 'string', group: 'guide'}),
    defineField({name: 'guideButtonLabel', title: 'Button label', type: 'string', group: 'guide'}),
    defineField({name: 'guideSuccessMessage', title: 'Success message', type: 'string', group: 'guide'}),
    defineField({name: 'guideFile', title: 'Guide PDF (file)', type: 'file', group: 'guide'}),
    defineField({name: 'guideUrl', title: 'Guide link (URL)', type: 'string', group: 'guide', description: 'Use either the file above or a URL.'}),
    defineField({name: 'guideDownloadLabel', title: '"Download now" link label', type: 'string', group: 'guide'}),

    defineField({name: 'guidePageEyebrow', title: 'Page eyebrow', type: 'string', group: 'guidePage'}),
    defineField({name: 'guidePageTitleLead', title: 'Page heading (before accent)', type: 'string', group: 'guidePage'}),
    defineField({name: 'guidePageTitleAccent', title: 'Page heading italic accent words', type: 'string', group: 'guidePage'}),
    defineField({name: 'guidePageIntroduction', title: 'Page introduction', type: 'text', rows: 3, group: 'guidePage'}),
    defineField({
      name: 'guidePagePoints',
      title: '"What\'s inside" items',
      type: 'array',
      group: 'guidePage',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Item title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', title: 'Item description', type: 'text', rows: 3}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Newsletter & Free Guide'})},
})
