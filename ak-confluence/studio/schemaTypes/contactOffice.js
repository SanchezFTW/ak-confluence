import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactOffice',
  title: 'Contact & Office',
  type: 'document',
  description: 'Location, contact details, and office hours shown in the footer and on the Contact page.',
  fields: [
    defineField({
      name: 'officeAddress',
      title: 'Office address',
      type: 'object',
      fields: [
        defineField({name: 'street', title: 'Street address', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'region', title: 'State or region', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal code', type: 'string'}),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      description: 'The public email shown in the footer and Contact page.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'The public phone number, shown as "Call or Text".',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office hours',
      type: 'array',
      description: 'Each row becomes one line in the footer Hours column.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'days', title: 'Days', type: 'string'}),
            defineField({name: 'opens', title: 'Opens', type: 'string'}),
            defineField({name: 'closes', title: 'Closes', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {list: ['Facebook', 'Instagram', 'LinkedIn', 'Other']},
            }),
            defineField({name: 'url', title: 'URL', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Contact & Office'})},
})
