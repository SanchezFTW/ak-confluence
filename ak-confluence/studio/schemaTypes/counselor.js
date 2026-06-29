import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'counselor',
  title: 'Counselor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / License',
      type: 'string',
      description: 'e.g. "Licensed Professional Counselor"',
    }),
    defineField({
      name: 'role',
      title: 'Role (optional)',
      type: 'string',
      description: 'e.g. "Founder". Leave blank for most counselors.',
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Full', value: 'full'},
          {title: 'Waitlist', value: 'waitlist'},
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
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'e.g. Anxiety, Depression, Grief & Loss, Relationship & Family, EMDR & Brainspotting, Major Life Changes',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Drag the focal point so the face stays centered when cropped.',
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
    select: {title: 'name', subtitle: 'title', media: 'photo'},
  },
})
