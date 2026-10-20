import {defineType, defineField} from 'sanity'

const contentBlock = {type: 'array', of: [{type: 'block'}]}

const section = (name, title, fields) => defineType({
  name,
  title,
  type: 'object',
  fields: [defineField({name: 'enabled', title: 'Show this section', type: 'boolean', initialValue: true}), ...fields],
})

const sections = [
  section('heroSection', 'Hero', [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'supportingCopy', title: 'Supporting copy', type: 'text', rows: 3}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
      defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
    ], validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true)}),
    defineField({name: 'button', title: 'Button', type: 'siteLink'}),
    defineField({name: 'variant', title: 'Approved style', type: 'string', options: {list: [
      {title: 'Image background', value: 'image'}, {title: 'Light', value: 'light'}, {title: 'Dark', value: 'dark'},
    ]}, initialValue: 'light'}),
  ]),
  section('richTextSection', 'Rich text', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'body', title: 'Text', ...contentBlock, validation: (rule) => rule.required()}),
    defineField({name: 'variant', title: 'Approved style', type: 'string', options: {list: [
      {title: 'Standard', value: 'standard'}, {title: 'Light', value: 'light'}, {title: 'Dark', value: 'dark'},
    ]}, initialValue: 'standard'}),
  ]),
  section('textImageSection', 'Text with image', [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Text', ...contentBlock}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
      defineField({name: 'decorative', title: 'Decorative image', type: 'boolean', initialValue: false}),
    ], validation: (rule) => rule.warning().custom((image) => image?.asset && !image.alt && !image.decorative ? 'Add alternative text or mark decorative.' : true)}),
    defineField({name: 'imagePosition', title: 'Image position', type: 'string', options: {list: [
      {title: 'Right', value: 'right'}, {title: 'Left', value: 'left'},
    ]}, initialValue: 'right'}),
    defineField({name: 'button', title: 'Button (optional)', type: 'siteLink'}),
  ]),
  section('serviceCardsSection', 'Service cards', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'services', title: 'Services', type: 'array', of: [{type: 'reference', to: [{type: 'service'}]}]}),
  ]),
  section('counselorCardsSection', 'Counselor cards', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'counselors', title: 'Counselors', type: 'array', of: [{type: 'reference', to: [{type: 'counselor'}]}]}),
  ]),
  section('workshopCardsSection', 'Workshop cards', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'workshops', title: 'Workshops', type: 'array', of: [{type: 'reference', to: [{type: 'workshop'}]}]}),
  ]),
  section('faqSection', 'FAQ section', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'faqs', title: 'Questions', type: 'array', of: [{type: 'reference', to: [{type: 'faq'}]}]}),
  ]),
  section('providerEndorsementsSection', 'Provider endorsements', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'endorsements', title: 'Endorsements', type: 'array', of: [{type: 'reference', to: [{type: 'providerEndorsement'}]}]}),
  ]),
  section('callToActionSection', 'Call to action', [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'supportingCopy', title: 'Supporting copy', type: 'text', rows: 3}),
    defineField({name: 'button', title: 'Button', type: 'siteLink'}),
    defineField({name: 'variant', title: 'Approved style', type: 'string', options: {list: [
      {title: 'Light', value: 'light'}, {title: 'Dark', value: 'dark'}, {title: 'Green', value: 'green'},
    ]}, initialValue: 'green'}),
  ]),
  section('newsletterSection', 'Newsletter signup', [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'supportingCopy', title: 'Supporting copy', type: 'text', rows: 3}),
  ]),
]

export const pageSectionTypes = sections

export const pageSections = defineType({
  name: 'pageSections',
  title: 'Page sections',
  type: 'array',
  of: sections.map(({name}) => ({type: name})),
})