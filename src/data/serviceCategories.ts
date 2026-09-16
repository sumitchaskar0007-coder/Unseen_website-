export const serviceCategories = [
  {
    number: '01',
    title: 'Media & Creative Services',
    summary: 'Stories, sound and moving images crafted to make brands memorable.',
    services: [
      { title: 'Documentary Films', to: '/services/film' },
      { title: 'Podcasts & Jingles', to: '/services/podcast' },
      { title: 'Video Advertisements', to: '/services/film' },
    ],
  },
  {
    number: '02',
    title: 'Digital Solutions',
    summary: 'Connected technology and growth systems for modern businesses.',
    services: [
      { title: 'Social Media Marketing', to: '/services/marketing' },
      { title: 'Website Development', to: '/services/webdev' },
      { title: 'Digital Marketing', to: '/services/marketing' },
      { title: 'SEO', to: '/services/seo' },
      { title: 'AI Automation', to: '/services' },
    ],
  },
  {
    number: '03',
    title: 'Business & Strategy',
    summary: 'Clear insights and practical direction for stronger business decisions.',
    services: [
      { title: 'Business Analytics', to: '/services' },
      { title: 'Business Strategy', to: '/services' },
    ],
  },
  {
    number: '04',
    title: 'Public Relations',
    summary: 'Reputation, positioning and communication that build lasting trust.',
    services: [
      { title: 'Personal PR', to: '/services' },
      { title: 'Corporate PR', to: '/services' },
    ],
  },
  {
    number: '05',
    title: 'Campaigns & Outreach',
    summary: 'High-impact communication designed to mobilise audiences at scale.',
    services: [
      { title: 'Political Campaigns', to: '/services/campaign' },
      { title: 'Bulk SMS Marketing', to: '/services/bulk' },
    ],
  },
] as const
