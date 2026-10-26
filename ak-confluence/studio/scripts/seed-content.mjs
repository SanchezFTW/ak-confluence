// Seeds the new Sanity structure with the content currently shown on the live
// site (sourced from the front-end fallback copy). Everything is created as a
// DRAFT so the live site does not change until you publish.
//
// Uses SANITY_AUTH_TOKEN (a project write token) for --apply; reads are public.
//
// Run from the studio directory:
//   node scripts/seed-content.mjs            # dry run (default)
//   node scripts/seed-content.mjs --apply    # create/update drafts
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '3gzdej0i'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = '2024-01-01'
const applyChanges = process.argv.includes('--apply')
const token = process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: false,
  ...(token ? {token} : {}),
})

// --- helpers ---------------------------------------------------------------

function portableText(text) {
  return [
    {
      _type: 'block',
      _key: 'answer',
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: 'text', text, marks: []}],
    },
  ]
}

const refs = (ids, weak = false) => ids.map((ref, i) => ({_key: `ref-${i + 1}`, _type: 'reference', _ref: ref, ...(weak ? {_weak: true} : {})}))

// --- Concerns (9 cards from the "Find the words that fit" page) --------------

const concerns = [
  {id: 'concern-anxiety', name: 'Anxiety', quote: 'My brain will not shut off.', body: 'Maybe you replay conversations, think ten steps ahead, assume something is about to go wrong, or spend a ridiculous amount of energy preparing for things that may never happen. You may look completely capable from the outside while your mind is running nonstop on the inside.', help: 'We help you catch the spiral earlier, and give your brain something else to do instead of running the worst case on a loop.', filter: true},
  {id: 'concern-depression', name: 'Depression', quote: "I don't feel like myself.", body: 'Things that used to feel easy take more effort. You may be working, parenting and showing up while still feeling disconnected, flat, irritated, exhausted, or like everything is harder than it should be.', help: "We start with something small enough to actually do, and build from there — until getting through the day doesn't take everything you've got.", filter: true},
  {id: 'concern-relationships-family', name: 'Relationships & Family', quote: "I don't know how to deal with this person anymore.", body: "Maybe you love them and they drive you absolutely nuts. Maybe you keep explaining yourself and still don't feel understood. Maybe you want to stay connected without losing yourself in the process.", help: "We help you say what you mean without it turning into the same fight, and figure out what you're actually willing to put up with.", filter: true},
  {id: 'concern-couples-counseling', name: 'Couples Counseling', quote: 'We keep having the same fight.', body: 'The subject changes, but somehow you end up in the same place. Someone gets louder, someone shuts down, someone feels criticized, someone feels ignored — and both of you leave wondering how you got there again.', help: "We slow it down enough that you can both catch it while it's happening, not just after — so it stops running on autopilot.", filter: false},
  {id: 'concern-major-life-changes', name: 'Major Life Changes', quote: "Everything changed and I don't know what I'm doing now.", body: "A new job. A breakup. Marriage. Divorce. A baby. A move. A career shift. A loss. A version of your life ending before you've figured out what comes next. Even good change can throw you off.", help: "We help you get your footing back, and figure out what you actually want now — not just what you thought you'd want.", filter: true},
  {id: 'concern-grief-loss', name: 'Grief & Loss', quote: "I thought I'd be handling this better by now.", body: "Grief doesn't care about your schedule. Sometimes it's obvious. Sometimes it shows up as numbness, irritation, anxiety, exhaustion or the strange feeling that everyone else has gone back to normal except you.", help: "You don't have to be handling it better by now, and you don't have to sit with it alone.", filter: true},
  {id: 'concern-trauma-recovery', name: 'Trauma Recovery', quote: 'Something that happened to me is still affecting me.', body: 'You may understand intellectually that something is over while your mind or body seems unconvinced. Certain situations, memories, people or reactions can pull you right back into something you thought you had already handled.', help: 'So your body eventually catches up to what your mind already knows, and stops hijacking you out of nowhere.', filter: false},
  {id: 'concern-emdr-brainspotting', name: 'EMDR & Brainspotting', quote: "I understand why I react this way. Understanding it just hasn't made it stop.", body: 'Sometimes insight gets you part of the way there, but the reaction is still happening. Some of our clinicians use EMDR and Brainspotting when those approaches fit the person and the work.', help: 'You do not need to know whether you need either approach before you come in. We can help you figure that out.', filter: true},
  {id: 'concern-individual-therapy', name: 'Individual Therapy', quote: 'I need to figure some stuff out.', body: "That's enough of a reason. You may be dealing with one specific problem or ten things that somehow became tangled together.", help: "That gives us room to slow down, actually look at what's going on, and figure out what to do about it — instead of just thinking about it on a loop.", filter: false},
].map((c, i) => ({
  _id: c.id,
  _type: 'concern',
  name: c.name,
  quote: c.quote,
  body: c.body,
  help: c.help,
  showAsFilter: c.filter,
  websiteVisible: true,
  order: (i + 1) * 10,
}))

// --- FAQs (9, in the live-site order) ---------------------------------------

const faqs = [
  {question: 'Is Therapy Right For Me?', answer: "If you find yourself having the same conversations in your head with little forward movement, therapy might be right for you. It's a place where you can sort through your thoughts and figure out how to move past the circular thinking, with someone who has been trained to help you do just that.", category: 'getting-started'},
  {question: 'Do I Really Need Therapy?', answer: 'Many things in life can be "handled" alone, but there are times when you may want company as you unpack certain aspects of your life. When it becomes clear that you need outside support, it may be better to sort things out with professionals who are prepared to help. If you are still on the fence about therapy and feel like you can "push through" it alone, just remember that counseling can only help.', category: 'getting-started'},
  {question: 'What Is Therapy Like?', answer: "Our aim is for therapy with us to feel like having an educated friend who's got your back, but will also call you out if we know you're moving in a direction you won't be proud of a year from now. If you are seeking ideas to expedite your goals, we help by offering some. If you have plenty of ideas and need someone to help you organize them, we do that too. We help you process major traumatic events in your childhood or current life, and if you require more direct support, such as EMDR or Brainspotting, we do that as well!", category: 'getting-started'},
  {question: 'How Will Therapy Help Me?', answer: "You don't have to be in crisis to benefit from therapy. Therapy can help you understand patterns, manage everyday stress, improve relationships, set boundaries, and build coping skills before problems feel overwhelming. Many people wait because they think they need a diagnosis, a major life event, or a breaking point before reaching out, but support can be helpful long before that. Starting therapy early can make it easier to talk about your feelings, notice burnout, and feel more prepared when life becomes stressful. At akConfluence, therapy is a space for growth, reflection, and support, no crisis required.", category: 'getting-started'},
  {question: 'Do You Accept Insurance?', answer: "We do accept most insurance and can bill them most of them on your behalf as a courtesy. Usually, we'll check your coverage within the first week of your consultation, so by the time you know you're a good fit with your counselor, we'll have all that information lined up and ready for you to consider as you plan future sessions.", category: 'payment'},
  {question: 'Is There A Sliding Fee?', answer: 'Confluence does not have a sliding fee at this time, but we do have out-of-pocket options. Feel free to contact us and inquire.', category: 'payment'},
  {question: 'Is Therapy Confidential?', answer: "Client confidentiality is the requirement that therapists, psychiatrists, psychologists, and most other mental health professionals protect their clients' privacy by not revealing the contents of therapy. Confidentiality includes not just the contents of therapy, but often the fact that a client is in therapy. However, we can and must break confidentiality in some circumstances, such as when a client is a threat to themselves or others.", category: 'other'},
  {question: 'Can We Do Sessions Over Video?', answer: 'Yes, we can. We offer telehealth sessions via a HIPAA-compliant platform.', category: 'office'},
  {question: 'What Is EMDR and Brainspotting?', answer: 'Brainspotting is considered a somatic therapy technique and uses body-centered interventions designed to calm the nervous system, release stored tension, and process trauma. It is a therapeutic technique designed to alleviate the distress associated with traumatic memories. Eye Movement Desensitization and Reprocessing (EMDR) is a structured, evidence-based psychotherapy designed to alleviate distress from traumatic memories and PTSD. It helps the brain reprocess stuck, painful memories by using bilateral stimulation such as guided eye movement, while focusing on the trauma, reducing the emotional charge and making memories feel less intense. In short: both techniques help you feel much more neutral about the traumatic events that have occurred in your long-ago past (and even the not-so-long-ago past).', category: 'services'},
].map((f, i) => ({
  _id: `faq-${i + 1}`,
  _type: 'faq',
  question: f.question,
  answer: portableText(f.answer),
  category: f.category,
  websiteVisible: true,
  order: (i + 1) * 10,
}))

// --- Provider endorsements (3, from the live site) --------------------------

const endorsements = [
  {id: 'provider-endorsement-danelle-r-winn-phd', providerName: 'Danelle R. Winn, PhD', quote: 'I have been a licensed psychologist in Anchorage for 22 years and can honestly say that Elly has been one of the highest caliber therapists it has been my pleasure to encounter. Her reassuring and thoughtful demeanor combined with her commitment to possibility of change for the better with each of her clients creates an ideal environment for effective therapy.'},
  {id: 'provider-endorsement-e-david-hjellen-do', providerName: 'E. David Hjellen, DO', organization: 'Frontier Health Services', quote: "I refer to akConfluence because their clinicians offer high-quality, individualized therapy that respects the complexity of my patients' needs. Their team is responsive, collaborative, and consistently earns the trust of even our most treatment-resistant cases."},
  {id: 'provider-endorsement-mercy-dennis', providerName: 'Mercy Dennis', organization: 'Retired Marriage and Family Therapist', quote: 'As a recently retired Marriage and Family Therapist with over 50 years of experience, I highly endorse akConfluence, its founder Elly, and her team. They offer exceptional services including individual therapy, couples therapy, group therapy, workshops, and training. Over the years, Elly has effectively supported several of my MFT supervisees through the licensure process. akConfluence is truly here to “help you imagine a future where today’s challenges don’t hold you back from reaching your full potential.”'},
].map((e, i) => ({...e, id: undefined, _id: e.id, _type: 'providerEndorsement', featured: true, websiteVisible: true, order: (i + 1) * 10}))

// --- Homepage ----------------------------------------------------------------

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroEyebrow: 'Therapy & Counseling, Anchorage, AK',
  heroHeadingLead: 'Finding your way',
  heroHeadingSecondPrefix: 'to',
  heroAccentWords: ['Clarity.', 'Connection.', 'Wholeness.'],
  heroIntro: 'Down to earth, and collaborative - supportive enough to sit with you, honest enough to help you actually move forward.',
  heroButtonLabel: 'Meet our counselors',
  heroButtonLink: {_type: 'link', label: 'Meet our counselors', url: '#counselors', openInNewTab: false},
  servicesIntro: {_type: 'sectionIntro', eyebrow: 'Services', heading: 'How we work', accent: 'together'},
  services: refs(['service-1', 'service-2', 'service-3', 'service-4']),
  concernsBandIntro: "You do not need the perfect explanation for what's wrong before you come in. Sometimes the first thing we do together is simply figure out:",
  concernsBandAccent: 'What are we working with?',
  concernsBandButtonLabel: 'Click me',
  concernsBandButtonLink: {_type: 'link', label: 'Click me', url: '/what-therapy-might-i-need', openInNewTab: false},
  counselorsIntro: {_type: 'sectionIntro', eyebrow: 'Our counselors', heading: 'Find your', accent: 'counselor'},
  counselorsSupporting: 'Every path is different. Filter by what matters to you and find the right fit for your journey.',
  endorsementsIntro: {_type: 'sectionIntro', eyebrow: 'Trusted By Providers', heading: 'What providers', accent: 'are saying'},
  endorsementsSubtitle: 'Endorsements from fellow Alaskan providers who refer their patients to our team.',
  founderNoteLabel: 'A Note From Our Founder',
  founderNoteParagraphs: [
    'You’ll notice our reviews are all from fellow healthcare providers, the people who trust us with their patients. We’re honored by that.',
    'You might wonder where the patient reviews are. Most of our new clients come through personal referrals from friends and family, but patient privacy laws mean we can’t ethically share those stories, even with permission.',
    'So if you’d like a patient’s perspective, ask around. Chances are someone in your circle has heard of us, and if not, that just means we have room to grow.',
  ],
  founderName: 'Elly Sanchez, Founder',
  faqIntro: {_type: 'sectionIntro', eyebrow: 'Common Questions', heading: 'Frequently', accent: 'asked'},
  faqSubtitle: 'We know starting therapy can bring up questions. Here are some answers to help you feel more at ease.',
  faqBottomNote: 'Still have questions?',
  faqLinkText: "We're happy to help",
  faqLinkUrl: 'mailto:info@akconfluence.com?subject=Question',
}

// --- Singletons ---------------------------------------------------------------

const navigation = {
  _id: 'navigation',
  _type: 'navigation',
  navLinks: [
    {_key: 'nav-services', _type: 'link', label: 'Services', url: '/#services', openInNewTab: false},
    {_key: 'nav-counselors', _type: 'link', label: 'Counselors', url: '/#counselors', openInNewTab: false},
    {_key: 'nav-newsletter', _type: 'link', label: 'Newsletter', url: '/newsletter', openInNewTab: false},
    {_key: 'nav-contact', _type: 'link', label: 'Contact', url: '/contact', openInNewTab: false},
  ],
  bookNowLabel: 'Book now',
  bookNowUrl: 'https://elly.clientsecure.me/contact-widget',
  bookNowOpenInNewTab: true,
  footerTagline: 'Together. Making a plan for intentional change.',
}

const contactOffice = {
  _id: 'contactOffice',
  _type: 'contactOffice',
  officeAddress: {_type: 'object', city: 'Anchorage', region: 'Alaska'},
  email: 'info@akconfluence.com',
  phone: '907-313-4433',
  officeHours: [
    {_key: 'weekdays', _type: 'object', days: 'Mon–Fri', opens: '8am', closes: '6pm'},
    {_key: 'saturday', _type: 'object', days: 'Sat', opens: '8am', closes: '2pm'},
  ],
  socialLinks: [
    {_key: 'facebook', _type: 'object', platform: 'Facebook', url: 'https://www.facebook.com/akconfluences/'},
    {_key: 'instagram', _type: 'object', platform: 'Instagram', url: 'https://www.instagram.com/akconfluence/'},
  ],
}

const newsletter = {
  _id: 'newsletter',
  _type: 'newsletter',
  monthlyEnabled: true,
  monthlyHeading: 'Join our newsletter',
  monthlySubtitle: 'Notes on boundaries, anxiety, and more.',
  monthlyEmailPlaceholder: 'Enter your email...',
  monthlyOptInText: 'Opt in to receive news and updates.',
  monthlyButtonLabel: 'Sign Up',
  monthlySuccessMessage: "You're subscribed! Thanks for joining.",
  guideHeadingLead: 'Get your free',
  guideHeadingAccent: 'Boundaries Blueprint',
  guideDescription: 'A practical guide to setting limits calmly and confidently, written by our therapists in Anchorage. Enter your email below to get instant access.',
  guideEmailPlaceholder: 'Enter your email...',
  guideOptInText: 'Opt in to receive news and updates.',
  guideButtonLabel: 'Get Guide',
  guideSuccessMessage: 'Your Boundaries Blueprint is on its way to your inbox!',
  guideUrl: 'https://akconfluence.com/boundaries-blueprint-guide.pdf',
  guideDownloadLabel: "Can't wait? Download it now →",
  guidePageEyebrow: 'Free Guide',
  guidePageTitleLead: 'The',
  guidePageTitleAccent: 'Boundaries Blueprint',
  guidePageIntroduction: "A short guide to setting boundaries that actually hold, written by our therapists in Anchorage. Enter your email below and it's yours, free.",
  guidePagePoints: [
    {_key: 'three-kinds', _type: 'object', title: 'The three kinds of boundaries', body: 'Physical, emotional, and mental boundaries, and how to tell which one you actually need.'},
    {_key: 'scripts', _type: 'object', title: "Scripts that don't sound like a fight", body: 'A simple structure for stating a limit calmly, plus example phrasing you can borrow word for word.'},
    {_key: 'worksheet', _type: 'object', title: 'A worksheet to build your own', body: "Guided prompts to work through one relationship where you've felt stretched thin, and write the boundary out."},
  ],
}

const announcement = {_id: 'announcement', _type: 'announcement', enabled: false}

const seoDefaults = {
  _id: 'seoDefaults',
  _type: 'seoDefaults',
  siteName: 'AK Confluence',
  defaultSeo: {
    _type: 'seo',
    title: 'AK Confluence, Therapy & Counseling in Anchorage, Alaska',
    description: 'AK Confluence is a collaborative, empowering therapy practice in Anchorage, Alaska offering individual therapy, couples counseling, trauma recovery, somatic work, and family sessions. In-person in Anchorage and virtual across Alaska. Most private health plans accepted.',
  },
}

// --- Counselor updates (fill only empty fields) --------------------------------

const counselorUpdates = [
  {_id: 'counselor-1', slug: 'elly-sanchez', isFounder: true, concerns: ['concern-anxiety', 'concern-depression', 'concern-emdr-brainspotting']},
  {_id: 'counselor-2', slug: 'samuel-peterson', isFounder: false, concerns: ['concern-grief-loss', 'concern-relationships-family', 'concern-major-life-changes', 'concern-anxiety', 'concern-depression', 'concern-emdr-brainspotting']},
  {_id: 'counselor-3', slug: 'jillian-thony', isFounder: false, concerns: ['concern-relationships-family', 'concern-anxiety', 'concern-depression']},
  {_id: 'counselor-4', slug: 'jessica-pretz', isFounder: false, concerns: ['concern-grief-loss', 'concern-anxiety', 'concern-depression', 'concern-emdr-brainspotting']},
  {_id: 'counselor-5', slug: 'joe-mattison', isFounder: false, concerns: ['concern-grief-loss', 'concern-major-life-changes', 'concern-anxiety', 'concern-depression']},
  {_id: 'counselor-6', slug: 'katie-mcnamara', isFounder: false, concerns: ['concern-grief-loss', 'concern-relationships-family', 'concern-major-life-changes', 'concern-anxiety', 'concern-depression', 'concern-emdr-brainspotting']},
]

// --- Duplicate post to remove (explicitly approved) ---------------------------

const duplicatePostId = 'post-self-care-for-relationship-growth'

// --- Build the plan -----------------------------------------------------------

const existing = await client.fetch(`{
  "concerns": *[_type == "concern"]._id,
  "faqs": *[_type == "faq"]._id,
  "endorsements": *[_type == "providerEndorsement"]._id,
  "homePage": *[_type == "homePage"][0]._id,
  "navigation": *[_type == "navigation"][0]._id,
  "contactOffice": *[_type == "contactOffice"][0]._id,
  "newsletter": *[_type == "newsletter"][0]._id,
  "announcement": *[_type == "announcement"][0]._id,
  "seoDefaults": *[_type == "seoDefaults"][0]._id,
  "counselors": *[_type == "counselor"],
  "posts": *[_type == "post"]._id
}`)

const existingSet = (list) => new Set(list || [])

const toCreate = []
for (const doc of [...concerns, ...faqs, ...endorsements, homePage, navigation, contactOffice, newsletter, announcement, seoDefaults]) {
  const key = doc._id
  const all = [
    ...(existing.concerns || []),
    ...(existing.faqs || []),
    ...(existing.endorsements || []),
    existing.homePage,
    existing.navigation,
    existing.contactOffice,
    existing.newsletter,
    existing.announcement,
    existing.seoDefaults,
  ].filter(Boolean)
  if (!all.includes(key)) toCreate.push(doc)
  else console.log(`- Already exists (left unchanged): ${doc._id}`)
}

const counselorDrafts = []
for (const update of counselorUpdates) {
  const published = (existing.counselors || []).find((c) => c._id === update._id)
  if (!published) { console.log(`- Counselor not found: ${update._id}`); continue }
  const {_id, _rev, _createdAt, _updatedAt, ...rest} = published
  counselorDrafts.push({
    _id: `drafts.${update._id}`,
    ...rest,
    slug: {_type: 'slug', current: update.slug},
    isFounder: update.isFounder,
    concerns: refs(update.concerns, true),
    featureOnHomepage: true,
    websiteVisible: true,
  })
}

const willDelete = existing.posts?.includes(duplicatePostId) ? duplicatePostId : null

console.log('=== Seed content (all drafts) ===')
console.log(`New documents to create: ${toCreate.length}`)
toCreate.forEach((d) => console.log(`- ${d._type}: ${d._id}`))
console.log(`Counselors to create drafts for: ${counselorDrafts.length}`)
counselorDrafts.forEach((c) => console.log(`- ${c._id}: slug, isFounder, concerns, featureOnHomepage, websiteVisible`))
console.log(`Duplicate post to delete: ${willDelete ? `${willDelete} (Self-Care for Relationship Growth, 2023-06-01)` : 'none (not found)'}`)

if (!applyChanges) {
  console.log('\nDry run only. Re-run with --apply (and SANITY_AUTH_TOKEN set) to create/update drafts.')
} else if (!token) {
  console.error('\nSANITY_AUTH_TOKEN is not set. No changes were made.')
  process.exitCode = 1
} else {
  const transaction = client.transaction()
  toCreate.forEach((doc) => transaction.createIfNotExists({...doc, _id: `drafts.${doc._id}`}))
  counselorDrafts.forEach((d) => transaction.createIfNotExists(d))
  if (willDelete) transaction.delete(willDelete)
  const result = await transaction.commit()
  console.log(`\nApplied: created ${result.results.filter((r) => r.operation === 'create').length} documents (including counselor drafts), ${willDelete ? 'deleted 1 duplicate post' : 'no deletion'} (all as drafts).`)
}
