import post from './post'
import counselor from './counselor'
import service from './service'
import siteSettings from './siteSettings'
import faq from './faq'
import workshop from './workshop'
import providerEndorsement from './providerEndorsement'
import seo from './seo'
import siteLink from './link'
import simpleLink from './simpleLink'
import sectionIntro from './sectionIntro'
import homePage from './homePage'
import page from './page'
import concern from './concern'
import navigation from './navigation'
import contactOffice from './contactOffice'
import newsletter from './newsletter'
import announcement from './announcement'
import seoDefaults from './seoDefaults'
import {pageSectionTypes, pageSections} from './pageSections'

export const schemaTypes = [
  post,
  counselor,
  service,
  siteSettings,
  faq,
  workshop,
  providerEndorsement,
  seo,
  siteLink,
  simpleLink,
  sectionIntro,
  homePage,
  page,
  concern,
  navigation,
  contactOffice,
  newsletter,
  announcement,
  seoDefaults,
  ...pageSectionTypes,
  pageSections,
]
