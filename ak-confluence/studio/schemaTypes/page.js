import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Page content', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'metadata', title: 'Search and social'},
  ],
  fields: [
    defineField({name: 'title', title: 'Page title', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().custom((slug, context) => {
        if (!slug?.current) return true
        if (['contact', 'newsletter', 'boundaries-blueprint'].includes(slug.current)) {
          return 'This URL is reserved for an existing website route.'
        }
        return context.getClient({apiVersion: '2024-01-01'}).fetch(
          '*[_type == "page" && slug.current == $slug && _id != $id][0]._id',
          {slug: slug.current, id: context.document?._id?.replace(/^drafts\./, '')}
        ).then((id) => id ? 'This page URL is already in use.' : true)
      }),
    }),
    defineField({name: 'sections', title: 'Page sections', type: 'pageSections', group: 'content', validation: (rule) => rule.required().min(1)}),
    defineField({name: 'includeInNavigation', title: 'Show in main navigation', type: 'boolean', group: 'navigation', initialValue: false}),
    defineField({name: 'navigationLabel', title: 'Navigation label', type: 'string', group: 'navigation', hidden: ({document}) => !document?.includeInNavigation}),
    defineField({name: 'navigationOrder', title: 'Navigation order', type: 'number', group: 'navigation', hidden: ({document}) => !document?.includeInNavigation, initialValue: 100}),
    defineField({name: 'websiteVisible', title: 'Show on website', type: 'boolean', group: 'navigation', initialValue: true}),
    defineField({name: 'seo', title: 'Search and social metadata', type: 'seo', group: 'metadata'}),
  ],
  orderings: [{title: 'Navigation order', name: 'navigationOrder', by: [{field: 'navigationOrder', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})