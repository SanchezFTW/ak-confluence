import post from './post'
import counselor from './counselor'
import service from './service'
import siteSettings from './siteSettings'
import faq from './faq'
import workshop from './workshop'
import providerEndorsement from './providerEndorsement'
import seo from './seo'
import link from './link'
import homePage from './homePage'
import page from './page'
import {pageSectionTypes, pageSections} from './pageSections'

export const schemaTypes = [post, counselor, service, siteSettings, faq, workshop, providerEndorsement, seo, link, homePage, page, ...pageSectionTypes, pageSections]
