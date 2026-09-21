export type CmsValue = string | boolean | string[]

export type CmsRecord = Record<string, CmsValue> & {
  id: string
  status: string
  image?: string
}

const keyFor = (collection: string) => `unseen-cms-${collection}`
const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

const requestHeaders = () => {
  const token = localStorage.getItem('adminToken')
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

export const cmsService = {
  list<T = CmsRecord>(collection: string): T[] {
    try {
      return JSON.parse(localStorage.getItem(keyFor(collection)) || '[]') as T[]
    } catch {
      return []
    }
  },

  save<T>(collection: string, records: T[]) {
    localStorage.setItem(keyFor(collection), JSON.stringify(records))
  },

  async sync<T = CmsRecord>(collection: string): Promise<T[]> {
    const response = await fetch(`${apiBase}/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { records?: T[] }
    const records = Array.isArray(payload.records) ? payload.records : []
    this.save(collection, records)
    return records
  },

  async saveRemote<T>(collection: string, records: T[]) {
    const response = await fetch(`${apiBase}/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ records }) })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({})) as { message?: string }
      throw new Error(payload.message || 'Unable to publish content')
    }
    this.save(collection, records)
  },

  get<T>(collection: string, fallback: T): T {
    try {
      return JSON.parse(localStorage.getItem(keyFor(collection)) || JSON.stringify(fallback)) as T
    } catch {
      return fallback
    }
  },

  set<T>(collection: string, value: T) {
    localStorage.setItem(keyFor(collection), JSON.stringify(value))
  },

  async syncValue<T>(collection: string): Promise<T | null> {
    const response = await fetch(`${apiBase}/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { value?: T | null }
    if (payload.value != null) this.set(collection, payload.value)
    return payload.value ?? null
  },

  async setRemote<T>(collection: string, value: T) {
    const response = await fetch(`${apiBase}/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ value }) })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({})) as { message?: string }
      throw new Error(payload.message || 'Unable to publish content')
    }
    this.set(collection, value)
  },

  published(collection: string) {
    return this.list<CmsRecord>(collection).filter((record) =>
      ['Published', 'Open'].includes(record.status)
    )
  },
}
