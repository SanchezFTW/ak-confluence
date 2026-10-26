import * as XLSX from 'xlsx'

const rows = [
  ['Live-site section', 'Sanity document', 'Field(s)', 'Source used', 'Status'],

  // Homepage
  ['Homepage — Hero', 'Homepage', 'heroEyebrow, heroHeadingLead, heroHeadingSecondPrefix, heroAccentWords, heroIntro, heroButtonLabel', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — Hero background photo', 'Homepage', 'heroImage', 'Repo fallback (none — default used)', 'Empty'],
  ['Homepage — Hero button link', 'Homepage', 'heroButtonLink', 'Repo fallback (#counselors)', 'Filled (draft)'],
  ['Homepage — Services section', 'Homepage', 'servicesIntro, services', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — "What are we working with?" band', 'Homepage', 'concernsBandIntro, concernsBandAccent, concernsBandButtonLabel, concernsBandButtonLink', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — Counselors section', 'Homepage', 'counselorsIntro, counselorsSupporting', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — Provider endorsements section', 'Homepage', 'endorsementsIntro, endorsementsSubtitle', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — Founder note', 'Homepage', 'founderNoteLabel, founderNoteParagraphs, founderName', 'Repo fallback (verbatim)', 'Filled (draft)'],
  ['Homepage — FAQ section', 'Homepage', 'faqIntro, faqSubtitle, faqBottomNote, faqLinkText, faqLinkUrl', 'Repo fallback (verbatim)', 'Filled (draft)'],

  // Concerns
  ['Concerns page — Anxiety', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Depression', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Relationships & Family', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Couples Counseling', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Major Life Changes', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Grief & Loss', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Trauma Recovery', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — EMDR & Brainspotting', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],
  ['Concerns page — Individual Therapy', 'Concern', 'name, quote, body, help, showAsFilter, order', 'Repo fallback (THERAPY_BOXES)', 'Filled (draft)'],

  // FAQs
  ['FAQ section — "Is Therapy Right For Me?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "Do I Really Need Therapy?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "What Is Therapy Like?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "How Will Therapy Help Me?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "Do You Accept Insurance?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "Is There A Sliding Fee?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "Is Therapy Confidential?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "Can We Do Sessions Over Video?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],
  ['FAQ section — "What Is EMDR and Brainspotting?"', 'FAQ', 'question, answer, category, order', 'Repo fallback (FAQ_DATA)', 'Filled (draft)'],

  // Endorsements
  ['Provider endorsements — Danelle R. Winn, PhD', 'Provider Endorsement', 'quote, providerName, featured, order', 'Repo fallback (DEFAULT_ENDORSEMENTS)', 'Filled (draft)'],
  ['Provider endorsements — E. David Hjellen, DO', 'Provider Endorsement', 'quote, providerName, organization, featured, order', 'Repo fallback (DEFAULT_ENDORSEMENTS)', 'Filled (draft)'],
  ['Provider endorsements — Mercy Dennis', 'Provider Endorsement', 'quote, providerName, organization, featured, order', 'Repo fallback (DEFAULT_ENDORSEMENTS)', 'Filled (draft)'],

  // Counselors
  ['Counselors — Elly Sanchez', 'Counselor', 'slug (elly-sanchez), isFounder (true), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — Samuel Peterson', 'Counselor', 'slug (samuel-peterson), isFounder (false), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — Jillian Thony', 'Counselor', 'slug (jillian-thony), isFounder (false), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — Jessica Pretz', 'Counselor', 'slug (jessica-pretz), isFounder (false), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — Joe Mattison', 'Counselor', 'slug (joe-mattison), isFounder (false), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — Katie McNamara', 'Counselor', 'slug (katie-mcnamara), isFounder (false), concerns, featureOnHomepage, websiteVisible', 'Existing Sanity + name match', 'Filled (draft)'],
  ['Counselors — bios / short intro / quote', 'Counselor', 'shortIntro, bio, quote', 'Not in repo or live site', 'Needs human input'],

  // Singletons
  ['Navigation & Footer — header links', 'Navigation & Footer', 'navLinks', 'Repo fallback (App.jsx)', 'Filled (draft)'],
  ['Navigation & Footer — Book Now button', 'Navigation & Footer', 'bookNowLabel, bookNowUrl, bookNowOpenInNewTab', 'Repo fallback (INTAKE_URL)', 'Filled (draft)'],
  ['Navigation & Footer — footer tagline', 'Navigation & Footer', 'footerTagline', 'Repo fallback (App.jsx)', 'Filled (draft)'],
  ['Navigation & Footer — footer link groups', 'Navigation & Footer', 'footerLinkGroups', 'None on live site', 'Empty'],
  ['Contact & Office — address', 'Contact & Office', 'officeAddress', 'Repo fallback (App.jsx)', 'Filled (draft)'],
  ['Contact & Office — email', 'Contact & Office', 'email', 'Repo fallback (info@akconfluence.com)', 'Filled (draft)'],
  ['Contact & Office — phone', 'Contact & Office', 'phone', 'Repo fallback + user confirmed (907-313-4433)', 'Filled (draft)'],
  ['Contact & Office — hours', 'Contact & Office', 'officeHours', 'Repo fallback (Mon–Fri 8–6, Sat 8–2)', 'Filled (draft)'],
  ['Contact & Office — social links', 'Contact & Office', 'socialLinks', 'Repo fallback (App.jsx)', 'Filled (draft)'],
  ['Newsletter & Free Guide — monthly popup', 'Newsletter & Free Guide', 'monthlyEnabled, monthlyHeading, monthlySubtitle, monthlyEmailPlaceholder, monthlyOptInText, monthlyButtonLabel, monthlySuccessMessage', 'Repo fallback (NewsletterSticky)', 'Filled (draft)'],
  ['Newsletter & Free Guide — free guide band', 'Newsletter & Free Guide', 'guideHeadingLead, guideHeadingAccent, guideDescription, guideEmailPlaceholder, guideOptInText, guideButtonLabel, guideSuccessMessage, guideUrl', 'Repo fallback (NewsletterSignup)', 'Filled (draft)'],
  ['Newsletter & Free Guide — guide page', 'Newsletter & Free Guide', 'guidePageEyebrow, guidePageTitleLead, guidePageTitleAccent, guidePageIntroduction, guidePagePoints', 'Repo fallback (BoundariesBlueprintPage)', 'Filled (draft)'],
  ['Announcement Banner', 'Announcement Banner', 'enabled (false), message, link, startsAt, endsAt', 'None active on live site', 'Empty'],
  ['SEO & Social Defaults — site name + default', 'SEO & Social Defaults', 'siteName, defaultSeo', 'Repo fallback (index.html)', 'Filled (draft)'],
  ['SEO & Social Defaults — page-level SEO', 'SEO & Social Defaults', 'homeSeo, counselorsSeo, concernsSeo, newsletterSeo', 'Not in repo or live site', 'Needs human input'],

  // Services
  ['Services — Individual Therapy', 'Service', 'title, desc, layout, order, image (slug empty)', 'Existing Sanity', 'Filled (existing)'],
  ['Services — Couples Counseling', 'Service', 'title, desc, layout, order, image (slug empty)', 'Existing Sanity', 'Filled (existing)'],
  ['Services — Trauma Recovery', 'Service', 'title, desc, layout, order, image (slug empty)', 'Existing Sanity', 'Filled (existing)'],
  ['Services — Workshops', 'Service', 'title, desc, layout, order, image (slug empty)', 'Existing Sanity', 'Filled (existing)'],
]

const ws = XLSX.utils.aoa_to_sheet(rows)
ws['!cols'] = [{wch: 42}, {wch: 22}, {wch: 60}, {wch: 34}, {wch: 18}]
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Content Map')
XLSX.writeFile(wb, 'content-map.xlsx')
console.log(`Wrote content-map.xlsx with ${rows.length - 1} content rows.`)
