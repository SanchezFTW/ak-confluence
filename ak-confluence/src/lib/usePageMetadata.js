import {createContext, useContext, useEffect} from 'react'
import {urlFor} from './sanity'

export const PageMetadataContext = createContext(null)

function setMeta(selector, attribute, value) {
  if (!value) return
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, selector.includes('property=') ? selector.match(/property="([^"]+)"/)[1] : selector.match(/name="([^"]+)"/)[1])
    document.head.appendChild(element)
  }
  element.content = value
}

export function usePageMetadata(seo, fallbackTitle, fallbackDescription) {
  const defaults = useContext(PageMetadataContext)

  useEffect(() => {
    const pageTitle = fallbackTitle?.trim()
    const siteTitle = defaults?.title?.trim()
    const title = seo?.title || (pageTitle && siteTitle && !pageTitle.includes(siteTitle)
      ? `${pageTitle} | ${siteTitle}`
      : pageTitle || siteTitle)
    const description = seo?.description || fallbackDescription || defaults?.description
    if (title) {
      document.title = title
      setMeta('meta[property="og:title"]', 'property', title)
      setMeta('meta[name="twitter:title"]', 'name', title)
    }
    if (description) {
      setMeta('meta[name="description"]', 'name', description)
      setMeta('meta[property="og:description"]', 'property', description)
      setMeta('meta[name="twitter:description"]', 'name', description)
    }
    const image = urlFor(seo?.image || defaults?.image)?.width(1200).fit('max').auto('format').url()
    if (image) {
      setMeta('meta[property="og:image"]', 'property', image)
      setMeta('meta[name="twitter:image"]', 'name', image)
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
      document.head.querySelector('meta[name="twitter:image"]')?.remove()
    }
    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.href = `${window.location.origin}${window.location.pathname}`
  }, [seo?.title, seo?.description, seo?.image?.asset?._ref, defaults?.title, defaults?.description, defaults?.image?.asset?._ref, fallbackTitle, fallbackDescription])
}