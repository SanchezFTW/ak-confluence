import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  groups: [
    {name: 'details', title: 'Workshop details', default: true},
    {name: 'schedule', title: 'Schedule and registration'},
    {name: 'website', title: 'Website'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'details', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'details',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().custom((slug, context) => {
        if (!slug?.current) return true
        return context.getClient({apiVersion: '2024-01-01'}).fetch(
          '*[_type == "workshop" && slug.current == $slug && _id != $id][0]._id',
          {slug: slug.current, id: context.document?._id?.replace(/^drafts\./, '')}
        ).then((id) => id ? 'This workshop URL is already in use.' : true)
      }),
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, group: 'details'}),
    defineField({name: 'description', title: 'Detailed description', type: 'array', of: [{type: 'block'}], group: 'details'}),
    defineField({name: 'intendedAudience', title: 'Intended audience', type: 'text', rows: 3, group: 'details'}),
    defineField({
      name: 'facilitators',
      title: 'Facilitators',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'counselor'}]}],
      group: 'details',
    }),
    defineField({
      name: 'sessions',
      title: 'Individual sessions',
      type: 'array',
      group: 'schedule',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'start', title: 'Start time', type: 'datetime', validation: (rule) => rule.required()}),
          defineField({name: 'end', title: 'End time', type: 'datetime', validation: (rule) => rule.required()}),
        ],
        preview: {select: {title: 'start', subtitle: 'end'}},
      }],
      validation: (rule) => rule.custom((sessions) => {
        const invalid = (sessions || []).some((session) =>
          !session.start || !session.end || new Date(session.end) <= new Date(session.start)
        )
        return invalid ? 'Each session needs an end time after its start time.' : true
      }),
    }),
    defineField({
      name: 'timezone',
      title: 'Event timezone',
      type: 'string',
      group: 'schedule',
      initialValue: 'America/Anchorage',
      validation: (rule) => rule.required().custom((value) => {
        try {
          new Intl.DateTimeFormat('en-US', {timeZone: value})
          return true
        } catch {
          return 'Enter a valid IANA timezone, such as America/Anchorage.'
        }
      }),
      description: 'Use an IANA timezone such as America/Anchorage. Times respect daylight-saving changes.',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      group: 'details',
      options: {list: [{title: 'In person', value: 'in-person'}, {title: 'Online', value: 'online'}, {title: 'Hybrid', value: 'hybrid'}]},
    }),
    defineField({name: 'venue', title: 'Venue', type: 'string', group: 'details', hidden: ({document}) => document?.format === 'online'}),
    defineField({name: 'onlineDetails', title: 'Online details', type: 'string', group: 'details', hidden: ({document}) => document?.format === 'in-person'}),
    defineField({name: 'price', title: 'Price (optional)', type: 'number', group: 'details', validation: (rule) => rule.min(0)}),
    defineField({name: 'paymentInstructions', title: 'Payment instructions (optional)', type: 'text', rows: 3, group: 'details'}),
    defineField({name: 'registrationUrl', title: 'Registration URL', type: 'url', group: 'schedule', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'registrationDeadline', title: 'Registration deadline', type: 'datetime', group: 'schedule'}),
    defineField({
      name: 'status',
      title: 'Registration status',
      type: 'string',
      group: 'schedule',
      options: {list: [
        {title: 'Upcoming', value: 'upcoming'},
        {title: 'Open', value: 'open'},
        {title: 'Full', value: 'full'},
        {title: 'Closed', value: 'closed'},
        {title: 'Canceled', value: 'canceled'},
      ], layout: 'radio'},
      initialValue: 'upcoming',
      validation: (rule) => rule.required().custom((status, context) => {
        if (status !== 'open') return true
        const workshop = context.document
        if (!workshop?.registrationUrl) return 'Add a registration URL before opening registration.'
        if (!workshop?.sessions?.some((session) => session.start)) return 'Add at least one session before opening registration.'
        return true
      }),
    }),
    defineField({name: 'announcement', title: 'Announcement (optional)', type: 'string', group: 'schedule', description: 'For example, a new-dates message when no future session is scheduled.'}),
    defineField({name: 'websiteVisible', title: 'Show on website', type: 'boolean', group: 'website', initialValue: true}),
    defineField({name: 'order', title: 'Display order', type: 'number', group: 'website', initialValue: 100, validation: (rule) => rule.required()}),
    defineField({name: 'seo', title: 'Search and social metadata', type: 'seo', group: 'website'}),
  ],
  orderings: [{title: 'Next session', name: 'nextSession', by: [{field: 'sessions.0.start', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'status'}},
})