import { useEffect, useState } from 'react'
import api from '../api'
import { cmsService } from '../services/cmsService'

export type PageKey = 'about' | 'process' | 'contact'

export type EditablePageSection = {
  id: string
  eyebrow: string
  title: string
  body: string
  image: string
  linkLabel: string
  linkUrl: string
}

export type EditablePageContent = {
  eyebrow: string
  title: string
  subtitle: string
  secondaryTitle: string
  body: string
  bodyTwo: string
  buttonLabel: string
  buttonUrl: string
  mapEmbedUrl: string
  services: string
  sections: EditablePageSection[]
}

const emptySection = (id: string, title: string, body: string): EditablePageSection => ({
  id,
  eyebrow: '',
  title,
  body,
  image: '',
  linkLabel: '',
  linkUrl: '',
})

export const pageContentDefaults: Record<PageKey, EditablePageContent> = {
  about: {
    eyebrow: 'Who we are',
    title: 'Creating impactful brand\nexperiences.',
    subtitle: 'We turn ambitious ideas into work people remember.',
    secondaryTitle: 'Independent by choice.\nCurious by nature.\nBuilt for impact.',
    body: 'Unseen Studios is an independent creative and digital agency built around a simple belief: meaningful work begins with understanding. We get close to the problem, uncover the real opportunity and shape ideas that connect.',
    bodyTwo: 'From films and identities to websites and growth campaigns, our team brings strategy, creativity and technology together under one roof.',
    buttonLabel: 'Start a conversation',
    buttonUrl: '/contact',
    mapEmbedUrl: '',
    services: '',
    sections: [],
  },
  process: {
    eyebrow: 'Process',
    title: 'A horizontal pipeline from signal to scale.',
    subtitle: 'Transparent phases, tight communication, and a single creative thread from brief to launch.',
    secondaryTitle: '',
    body: '',
    bodyTwo: '',
    buttonLabel: '',
    buttonUrl: '',
    mapEmbedUrl: '',
    services: '',
    sections: [
      emptySection('research', 'Research', 'Audience, competitors, and cultural signals — distilled into clarity.'),
      emptySection('strategy', 'Strategy', 'Positioning, narrative, channel plan, and KPI architecture.'),
      emptySection('production', 'Production', 'Film, audio, design, and build — executed to spec and schedule.'),
      emptySection('marketing', 'Marketing', 'Launch systems, paid/organic engines, and creative iteration loops.'),
      emptySection('growth', 'Growth', 'Scale what wins. Retention, LTV, and compounding brand equity.'),
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Start a conversation — we'll reply where you already work.",
    subtitle: 'Send the brief through the form. It opens WhatsApp with your details prefilled so we can respond fast.',
    secondaryTitle: '',
    body: '',
    bodyTwo: '',
    buttonLabel: 'Send via WhatsApp',
    buttonUrl: '',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.568220122809!2d73.8029950737989!3d18.457903571088238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295500abb3d75%3A0x7ec192ce5faba3be!2sUnseen%20studio%2FTrijja%20Media%20Works!5e0!3m2!1sen!2sin!4v1784527998439!5m2!1sen!2sin',
    services: 'Documentary Films\nPodcast & Jingles\nVideo Ads\nSocial Media Marketing\nWebsite Development\nDigital Marketing\nSEO Optimization\nPolitical Campaigns\nBulk SMS Marketing\nOther / Not sure',
    sections: [],
  },
}

export const pageContentKey = (page: PageKey) => `page-${page}`

export function getPageContent(page: PageKey) {
  const fallback = pageContentDefaults[page]
  const saved = cmsService.get<Partial<EditablePageContent>>(pageContentKey(page), fallback)
  return { ...fallback, ...saved, sections: saved.sections || fallback.sections }
}

export async function fetchPageContent(page: PageKey) {
  const response = await api.get<{ content: Partial<EditablePageContent> | null }>(`/pages/${page}`)
  if (!response.data.content) return null
  const fallback = pageContentDefaults[page]
  return { ...fallback, ...response.data.content, sections: response.data.content.sections || fallback.sections }
}

export async function savePageContent(page: PageKey, content: EditablePageContent) {
  cmsService.set(pageContentKey(page), content)
  await api.put(`/pages/${page}`, content)
}

export function usePageContent(page: PageKey) {
  const [content,setContent] = useState<EditablePageContent>(()=>getPageContent(page))

  useEffect(()=>{
    let active = true
    fetchPageContent(page).then((remote)=>{
      if(!active||!remote)return
      cmsService.set(pageContentKey(page),remote)
      setContent(remote)
    }).catch(()=>undefined)
    return ()=>{active=false}
  },[page])

  return content
}
