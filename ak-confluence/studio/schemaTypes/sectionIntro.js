import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sectionIntro',
  title: 'Section heading',
  type: 'object',
  description: 'A reusable heading block: small label, heading, italic accent words, and a subtitle.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      description: 'Small uppercase label shown above the heading (for example "Services").',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main heading text, shown before the italic accent words.',
    }),
    defineField({
      name: 'accent',
      title: 'Italic accent words',
      type: 'string',
      description: 'The words shown in italic green right after the heading (for example "together").',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      description: 'Supporting sentence shown under the heading.',
    }),
  ],
})
