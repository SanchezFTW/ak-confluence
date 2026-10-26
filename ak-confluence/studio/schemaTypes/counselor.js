import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'counselor',
  title: 'Counselor',
  type: 'document',
  groups: [
    {name: 'profile', title: 'Profile', default: true},
    {name: 'practice', title: 'Practice'},
    {name: 'website', title: 'Website'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / License',
      type: 'string',
      group: 'profile',
      description: 'e.g. "Licensed Professional Counselor"',
    }),
    defineField({
      name: 'role',
      title: 'Role (optional)',
      type: 'string',
      group: 'profile',
      description: 'e.g. "Founder". Leave blank for most counselors.',
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns (optional)',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'shortIntro',
      title: 'Short introduction',
      type: 'text',
      rows: 3,
      group: 'profile',
      description: 'Brief public introduction for counselor cards.',
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      group: 'practice',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Full', value: 'full'},
          {title: 'Waitlist', value: 'waitlist'},
          {title: 'Unavailable', value: 'unavailable'},
        ],
        layout: 'radio',
      },
      initialValue: 'open',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote / Tagline',
      type: 'text',
      rows: 2,
      group: 'profile',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'practice',
      description: 'e.g. Anxiety, Depression, Grief & Loss, Relationship & Family, EMDR & Brainspotting, Major Life Changes',
    }),
    defineField({
      name: 'populations',
      title: 'Populations served',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'practice',
    }),
    defineField({
      name: 'therapyApproaches',
      title: 'Therapy approaches',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'practice',
    }),
    defineField({
      name: 'services',
      title: 'Services provided',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      group: 'practice',
      description: 'Choose services here. Service pages derive their counselor list from these references.',
    }),
    defineField({
      name: 'inPersonAvailable',
      title: 'Offers in-person sessions',
      type: 'boolean',
      group: 'practice',
    }),
    defineField({
      name: 'telehealthAvailable',
      title: 'Offers telehealth',
      type: 'boolean',
      group: 'practice',
    }),
    defineField({
      name: 'consultationUrl',
      title: 'Consultation or booking link',
      type: 'url',
      group: 'practice',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'publicEmail',
      title: 'Public email (optional)',
      type: 'email',
      group: 'practice',
      description: 'Only add an address approved for public display.',
    }),
    defineField({
      name: 'publicPhone',
      title: 'Public phone (optional)',
      type: 'string',
      group: 'practice',
      description: 'Only add a number approved for public display.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
      group: 'profile',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      group: 'profile',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the portrait for visitors who cannot see it.',
        }),
        defineField({
          name: 'decorative',
          title: 'Decorative image',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      validation: (rule) => rule.warning().custom((image) => {
        if (image?.asset && !image.alt && !image.decorative) {
          return 'Add alternative text or mark this image as decorative.'
        }
        return true
      }),
      description: 'Drag the focal point so the face stays centered when cropped.',
    }),
    defineField({
      name: 'websiteVisible',
      title: 'Show on website',
      type: 'boolean',
      group: 'website',
      initialValue: true,
      description: 'Controls public visibility only; it does not change availability.',
    }),
    defineField({
      name: 'featureOnHomepage',
      title: 'Feature on homepage',
      type: 'boolean',
      group: 'website',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Profile URL (optional)',
      type: 'slug',
      group: 'website',
      options: {source: 'name', maxLength: 96},
      description: 'Generate this to enable a public counselor profile page.',
      validation: (rule) => rule.custom((slug, context) => {
        if (!slug?.current) return true
        return context.getClient({apiVersion: '2024-01-01'}).fetch(
          '*[_type == "counselor" && slug.current == $slug && _id != $id][0]._id',
          {slug: slug.current, id: context.document?._id?.replace(/^drafts\./, '')}
        ).then((id) => id ? 'This counselor profile URL is already in use.' : true)
      }),
    }),
    defineField({name: 'seo', title: 'Search and social metadata', type: 'seo', group: 'website'}),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'website',
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
    select: {title: 'name', role: 'role', credentials: 'title', media: 'photo'},
    prepare: ({title, role, credentials, media}) => ({
      title,
      subtitle: [role, credentials].filter(Boolean).join(' · '),
      media,
    }),
  },
})
