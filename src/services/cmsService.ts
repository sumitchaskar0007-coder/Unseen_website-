export type CmsValue = string | boolean | string[]

export type CmsRecord = Record<string, CmsValue> & {
  id: string
  status: string
  image?: string
}

const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
// CMS content belongs to the shared database. This cache only prevents repeat
// requests during the current page session; it is never persisted in the browser.
const cache = new Map<string, unknown>()
const legacyKeyFor = (collection: string) => `unseen-cms-${collection}`

const requestHeaders = () => {
  const token = localStorage.getItem('adminToken')
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

export const cmsService = {
  list<T = CmsRecord>(collection: string): T[] {
    const records = cache.get(collection)
    return Array.isArray(records) ? records as T[] : []
  },

  save<T>(collection: string, records: T[]) {
    cache.set(collection, records)
  },

  async sync<T = CmsRecord>(collection: string): Promise<T[]> {
    const response = await fetch(`${apiBase}/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { records?: T[] }
    const records = Array.isArray(payload.records) ? payload.records : []
    cache.set(collection, records)
    return records
  },

  async saveRemote<T>(collection: string, records: T[]) {
    const response = await fetch(`${apiBase}/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ records }) })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({})) as { message?: string }
      throw new Error(payload.message || 'Unable to publish content')
    }
    const payload = await response.json() as { records?: T[] }
    cache.set(collection, Array.isArray(payload.records) ? payload.records : records)
  },

  get<T>(collection: string, fallback: T): T {
    return (cache.get(collection) as T | undefined) ?? fallback
  },

  set<T>(collection: string, value: T) {
    cache.set(collection, value)
  },

  async syncValue<T>(collection: string): Promise<T | null> {
    const response = await fetch(`${apiBase}/cms/${collection}`)
    if (!response.ok) throw new Error('Unable to sync content')
    const payload = await response.json() as { value?: T | null }
    if (payload.value != null) cache.set(collection, payload.value)
    return payload.value ?? null
  },

  async setRemote<T>(collection: string, value: T) {
    const response = await fetch(`${apiBase}/cms/${collection}`, { method: 'PUT', headers: requestHeaders(), body: JSON.stringify({ value }) })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({})) as { message?: string }
      throw new Error(payload.message || 'Unable to publish content')
    }
    const payload = await response.json() as { value?: T | null }
    cache.set(collection, payload.value ?? value)
  },

  // One-time import for content created by older releases. The old browser copy
  // is removed only after the MongoDB write succeeds.
  legacy<T>(collection: string): T | null {
    try {
      const raw = localStorage.getItem(legacyKeyFor(collection))
      return raw === null ? null : JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  clearLegacy(collection: string) {
    localStorage.removeItem(legacyKeyFor(collection))
  },

  published(collection: string) {
    return this.list<CmsRecord>(collection).filter((record) =>
      ['Published', 'Open'].includes(record.status)
    )
  },
}
