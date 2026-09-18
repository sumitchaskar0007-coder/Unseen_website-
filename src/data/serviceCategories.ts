import { onlineImages } from './onlineImages'

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
      { title: 'Documentary Films', to: '/services/film', images: [onlineImages.filmSet] },
      { title: 'Podcasts & Jingles', to: '/services/podcast', images: [onlineImages.podcastStudio] },
      { title: 'Video Advertisements', to: '/services/film', images: [onlineImages.cameraOperator] },
    ],
  },
  {
    number: '02',
    title: 'Digital Solutions',
    summary: 'Connected technology and growth systems for modern businesses.',
    services: [
      { title: 'Social Media Marketing', to: '/services/marketing', images: [onlineImages.socialMedia] },
      { title: 'Website Development', to: '/services/webdev', images: [onlineImages.developerWorkspace, onlineImages.codeScreen] },
      { title: 'Digital Marketing', to: '/services/marketing', images: [onlineImages.analytics] },
      { title: 'SEO', to: '/services/seo', images: [onlineImages.analyticsDashboard] },
      { title: 'AI Automation', to: '/services', images: [onlineImages.serverRoom] },
    ],
  },
  {
    number: '03',
    title: 'Business & Strategy',
    summary: 'Clear insights and practical direction for stronger business decisions.',
    services: [
      { title: 'Business Analytics', to: '/services', images: [onlineImages.analyticsDashboard] },
      { title: 'Business Strategy', to: '/services', images: [onlineImages.businessPlanning] },
    ],
  },
  {
    number: '04',
    title: 'Public Relations',
    summary: 'Reputation, positioning and communication that build lasting trust.',
    services: [
      { title: 'Personal PR', to: '/services', images: [onlineImages.collaboration] },
      { title: 'Corporate PR', to: '/services', images: [onlineImages.agencyTeam] },
    ],
  },
  {
    number: '05',
    title: 'Campaigns & Outreach',
    summary: 'High-impact communication designed to mobilise audiences at scale.',
    services: [
      { title: 'Political Campaigns', to: '/services/campaign', images: [onlineImages.agencyTeam] },
      { title: 'Bulk SMS Marketing', to: '/services/bulk', images: [onlineImages.socialMedia] },
    ],
  },
]
