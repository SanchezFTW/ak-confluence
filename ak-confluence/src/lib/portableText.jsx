import {PortableText as BasePortableText} from '@portabletext/react'
import {urlFor} from './sanity'

const components = {
  types: {
    image: ({value}) => {
      const url = urlFor(value)?.width(1200).fit('max').auto('format').url()
      if (!url) return null
      return (
        <img
          src={url}
          alt={value.alt || ''}
          loading="lazy"
          className="my-8 w-full rounded-xl"
        />
      )
    },
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
          className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

// Renders Sanity Portable Text. Wrap in a `.prose-newsletter` container so the
// existing typography CSS (p / h3 / ul / ol / strong / em) applies.
export function PortableText({value}) {
  return <BasePortableText value={value} components={components} />
}
