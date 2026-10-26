import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement Banner',
  type: 'document',
  description: 'An optional bar shown at the top of every page.',
  fields: [
    defineField({name: 'enabled', title: 'Show the announcement banner', type: 'boolean', initialValue: false}),
    defineField({name: 'message', title: 'Message', type: 'string', hidden: ({parent}) => !parent?.enabled}),
    defineField({name: 'link', title: 'Optional link', type: 'link', hidden: ({parent}) => !parent?.enabled}),
    defineField({name: 'startsAt', title: 'Start date (optional)', type: 'datetime', hidden: ({parent}) => !parent?.enabled}),
    defineField({name: 'endsAt', title: 'End date (optional)', type: 'datetime', hidden: ({parent}) => !parent?.enabled}),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value?.enabled) return true
      if (!value.message?.trim()) return 'Enter announcement text before enabling it.'
      if (value.startsAt && value.endsAt && new Date(value.endsAt) <= new Date(value.startsAt)) {
        return 'The end date must be after the start date.'
      }
      return true
    }),
  preview: {prepare: () => ({title: 'Announcement Banner'})},
})
