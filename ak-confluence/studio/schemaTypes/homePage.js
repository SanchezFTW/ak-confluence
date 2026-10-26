import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  description: 'The content of the home page, grouped in the order it appears on the site.',
  groups: [
    {name: 'hero', title: '1. Hero', default: true},
    {name: 'services', title: '2. Services section'},
    {name: 'concernsBand', title: '3. "What are we working with?" band'},
    {name: 'counselors', title: '4. Counselors section'},
    {name: 'endorsements', title: '5. Provider endorsements section'},
    {name: 'faq', title: '6. FAQ section'},
  ],
  fields: [
    // 1. Hero
    defineField({
      name: 'heroEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'hero',
      description: 'Shown above the headline, e.g. "Therapy & Counseling, Anchorage, AK".',
    }),
    defineField({name: 'heroHeadingLead', title: 'Headline first line', type: 'string', group: 'hero', description: 'e.g. "Finding your way".'}),
    defineField({name: 'heroHeadingSecondPrefix', title: 'Headline second-line prefix', type: 'string', group: 'hero', description: 'The word before the rotating accent word, e.g. "to".'}),
    defineField({
      name: 'heroAccentWords',
      title: 'Rotating accent words',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'hero',
      description: 'Words that cycle in the headline in italic green, e.g. "Wholeness.".',
    }),
    defineField({name: 'heroIntro', title: 'Intro sentence', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Background photo', type: 'image', options: {hotspot: true}, group: 'hero'}),
    defineField({name: 'heroButtonLabel', title: 'Button label', type: 'string', group: 'hero', description: 'e.g. "Meet our counselors".'}),
    defineField({name: 'heroButtonLink', title: 'Button link', type: 'link', group: 'hero'}),

    // 2. Services section
    defineField({name: 'servicesIntro', title: 'Section heading', type: 'sectionIntro', group: 'services'}),
    defineField({
      name: 'services',
      title: 'Services to show',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      group: 'services',
      description: 'Pick the services and drag to reorder. Leave empty to show all services in their own order.',
    }),

    // 3. "What are we working with?" band
    defineField({name: 'concernsBandIntro', title: 'Intro text', type: 'text', rows: 3, group: 'concernsBand'}),
    defineField({name: 'concernsBandAccent', title: 'Accent line', type: 'string', group: 'concernsBand', description: 'The italic line, e.g. "What are we working with?".'}),
    defineField({name: 'concernsBandButtonLabel', title: 'Button label', type: 'string', group: 'concernsBand'}),
    defineField({name: 'concernsBandButtonLink', title: 'Button link', type: 'link', group: 'concernsBand'}),

    // 4. Counselors section
    defineField({name: 'counselorsIntro', title: 'Section heading', type: 'sectionIntro', group: 'counselors', description: 'e.g. "Find your counselor".'}),
    defineField({name: 'counselorsSupporting', title: 'Supporting sentence', type: 'text', rows: 3, group: 'counselors'}),

    // 5. Provider endorsements section
    defineField({name: 'endorsementsIntro', title: 'Section heading', type: 'sectionIntro', group: 'endorsements', description: 'e.g. "What providers are saying".'}),
    defineField({name: 'endorsementsSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'endorsements'}),
    defineField({name: 'founderNoteLabel', title: 'Founder note label', type: 'string', group: 'endorsements', description: 'e.g. "A Note From Our Founder".'}),
    defineField({name: 'founderNoteParagraphs', title: 'Founder note paragraphs', type: 'array', of: [{type: 'text'}], group: 'endorsements'}),
    defineField({name: 'founderName', title: 'Founder name', type: 'string', group: 'endorsements'}),

    // 6. FAQ section
    defineField({name: 'faqIntro', title: 'Section heading', type: 'sectionIntro', group: 'faq', description: 'e.g. "Frequently asked".'}),
    defineField({name: 'faqSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'faq'}),
    defineField({name: 'faqBottomNote', title: 'Closing note text', type: 'string', group: 'faq', description: 'Shown before the link, e.g. "Still have questions?".'}),
    defineField({name: 'faqLinkText', title: '"Still have questions?" link text', type: 'string', group: 'faq'}),
    defineField({name: 'faqLinkUrl', title: '"Still have questions?" link destination', type: 'string', group: 'faq', description: 'e.g. mailto:info@akconfluence.com?subject=Question'}),
  ],
  preview: {prepare: () => ({title: 'Homepage'})},
})