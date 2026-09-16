type ServiceItem = {
  title: string
  to: string
  images?: readonly string[]
}

type ServiceCategory = {
  number: string
  title: string
  summary: string
  services: readonly ServiceItem[]
}

export const serviceCategories: readonly ServiceCategory[] = [
  {
    number: '01',
    title: 'Media & Creative Services',
    summary: 'Stories, sound and moving images crafted to make brands memorable.',
    services: [
      { title: 'Documentary Films', to: '/services/film', images: ['assets/service/film_production.png'] },
      { title: 'Podcasts & Jingles', to: '/services/podcast', images: ['assets/service/podcast.png'] },
      { title: 'Video Advertisements', to: '/services/film', images: ['assets/service/video_marketing.png'] },
    ],
  },
  {
    number: '02',
    title: 'Digital Solutions',
    summary: 'Connected technology and growth systems for modern businesses.',
    services: [
      { title: 'Social Media Marketing', to: '/services/marketing' },
      { title: 'Website Development', to: '/services/webdev', images: ['assets/service/web_design.png', 'assets/service/web_development.png'] },
      { title: 'Digital Marketing', to: '/services/marketing', images: ['assets/service/digital_marketing.png'] },
      { title: 'SEO', to: '/services/seo', images: ['assets/service/seo.png'] },
      { title: 'AI Automation', to: '/services', images: ['assets/service/erp_solution.png'] },
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
      { title: 'Political Campaigns', to: '/services/campaign', images: ['assets/service/paid_adv.png'] },
      { title: 'Bulk SMS Marketing', to: '/services/bulk', images: ['assets/service/bulk_sms.png'] },
    ],
  },
]
