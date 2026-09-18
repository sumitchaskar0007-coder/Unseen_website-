export type CmsValue = string | boolean | string[]

export type CmsRecord = Record<string, CmsValue> & {
  id: string
  status: string
  image?: string
}

const keyFor = (collection: string) => `unseen-cms-${collection}`

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
    const response = await fetch(`/api/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { records?: T[] }
    if (payload.records?.length) this.save(collection, payload.records)
    return payload.records || []
  },

  async saveRemote<T>(collection: string, records: T[]) {
    this.save(collection, records)
    const response = await fetch(`/api/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ records }) })
    if (!response.ok) throw new Error('Unable to publish content')
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
    const response = await fetch(`/api/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { value?: T | null }
    if (payload.value != null) this.set(collection, payload.value)
    return payload.value ?? null
  },

  async setRemote<T>(collection: string, value: T) {
    this.set(collection, value)
    const response = await fetch(`/api/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ value }) })
    if (!response.ok) throw new Error('Unable to publish content')
  },

  published(collection: string) {
    return this.list<CmsRecord>(collection).filter((record) =>
      ['Published', 'Open'].includes(record.status)
    )
  },
}
