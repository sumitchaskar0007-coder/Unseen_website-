import cors from 'cors'
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import dotenv from 'dotenv'
import express from 'express'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'

const serverDirectory = dirname(fileURLToPath(import.meta.url))
const environmentPath = resolve(serverDirectory, '../.env')
const uploadsDirectory = resolve(serverDirectory, '../uploads')
dotenv.config({ path: environmentPath })

const app = express()
const port = Number(process.env.PORT || 5001)
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    const error = new Error('Origin is not allowed by CORS')
    error.status = 403
    return callback(error)
  },
  credentials: true,
}))
app.use(express.json({ limit: '5mb' }))

const pageContentSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true, enum: ['about', 'process', 'contact'] },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true })

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', pageContentSchema)

const cmsCollectionSchema = new mongoose.Schema({
  collection: { type: String, required: true, unique: true },
  records: { type: [mongoose.Schema.Types.Mixed], default: [] },
  value: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true, suppressReservedKeysWarning: true })

const CmsCollection = mongoose.models.CmsCollection || mongoose.model('CmsCollection', cmsCollectionSchema)
const cmsCollections = new Set(['projects', 'clients', 'blogs', 'testimonials', 'hiring', 'services', 'team', 'media', 'homepage', 'settings'])

mongoose.connection.on('disconnected', () => console.warn('MongoDB connection closed'))
mongoose.connection.on('error', (error) => console.error(`MongoDB connection error: ${error.message}`))

function createAdminToken(email) {
  const payload = Buffer.from(JSON.stringify({ role: 'admin', email, exp: Date.now() + 12 * 60 * 60 * 1000 })).toString('base64url')
  const signature = createHmac('sha256', process.env.ADMIN_TOKEN_SECRET).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function requireAdmin(request, response, next) {
  try {
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, '') || ''
    const [payload, signature] = token.split('.')
    if (!payload || !signature) return response.status(401).json({ message: 'Authentication required' })
    const expected = createHmac('sha256', process.env.ADMIN_TOKEN_SECRET).update(payload).digest('base64url')
    const validSignature = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!validSignature || claims.role !== 'admin' || claims.exp < Date.now()) return response.status(401).json({ message: 'Session expired' })
    return next()
  } catch {
    return response.status(401).json({ message: 'Authentication required' })
  }
}

app.post('/api/admin/login', (request, response) => {
  const suppliedEmail = String(request.body?.email || '').trim().toLowerCase()
  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const supplied = Buffer.from(String(request.body?.password || ''))
  const expected = Buffer.from(String(process.env.ADMIN_PASSWORD || ''))
  const validEmail = suppliedEmail.length > 0 && suppliedEmail === expectedEmail
  const validPassword = supplied.length === expected.length && expected.length > 0 && timingSafeEqual(supplied, expected)
  const valid = validEmail && validPassword
  if (!valid) return response.status(401).json({ message: 'Incorrect password' })
  return response.json({ token: createAdminToken(suppliedEmail), email: suppliedEmail })
})

app.post('/api/media/upload', requireAdmin, async (request, response, next) => {
  try {
    const data = String(request.body?.data || '')
    const match = data.match(/^data:(image\/(?:jpeg|png|webp|gif)|video\/(?:mp4|webm|ogg));base64,([A-Za-z0-9+/=\s]+)$/)
    if (!match) return response.status(400).json({ message: 'Unsupported media file' })

    const extensions = {
      'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
      'video/mp4': 'mp4', 'video/webm': 'webm', 'video/ogg': 'ogv',
    }
    const buffer = Buffer.from(match[2].replace(/\s/g, ''), 'base64')
    if (!buffer.length || buffer.length > 3 * 1024 * 1024) {
      return response.status(413).json({ message: 'Media files must be smaller than 3 MB' })
    }

    const mediaDirectory = resolve(uploadsDirectory, 'media')
    await mkdir(mediaDirectory, { recursive: true })
    const filename = `${randomUUID()}.${extensions[match[1]]}`
    await writeFile(resolve(mediaDirectory, filename), buffer, { flag: 'wx' })
    return response.status(201).json({ url: `/uploads/media/${filename}` })
  } catch (error) {
    return next(error)
  }
})

app.get('/api/pages/:page', async (request, response, next) => {
  try {
    if (!['about', 'process', 'contact'].includes(request.params.page)) {
      return response.status(404).json({ message: 'Page not found' })
    }
    const record = await PageContent.findOne({ page: request.params.page }).lean()
    return response.json({ content: record?.content || null })
  } catch (error) {
    return next(error)
  }
})

app.put('/api/pages/:page', requireAdmin, async (request, response, next) => {
  try {
    if (!['about', 'process', 'contact'].includes(request.params.page)) {
      return response.status(404).json({ message: 'Page not found' })
    }
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      return response.status(400).json({ message: 'Invalid page content' })
    }
    const record = await PageContent.findOneAndUpdate(
      { page: request.params.page },
      { content: request.body },
      { returnDocument: 'after', upsert: true, runValidators: true },
    ).lean()
    return response.json({ content: record.content })
  } catch (error) {
    return next(error)
  }
})

app.get('/api/cms/:collection', async (request, response, next) => {
  try {
    if (!cmsCollections.has(request.params.collection)) return response.status(404).json({ message: 'Collection not found' })
    const record = await CmsCollection.findOne({ collection: request.params.collection }).lean()
    return response.json({ records: record?.records || [], value: record?.value ?? null })
  } catch (error) {
    return next(error)
  }
})

app.put('/api/cms/:collection', requireAdmin, async (request, response, next) => {
  try {
    if (!cmsCollections.has(request.params.collection)) return response.status(404).json({ message: 'Collection not found' })
    const hasRecords = Array.isArray(request.body?.records)
    const update = hasRecords ? { records: request.body.records } : { value: request.body?.value ?? null }
    const record = await CmsCollection.findOneAndUpdate(
      { collection: request.params.collection },
      update,
      { returnDocument: 'after', upsert: true, runValidators: true },
    ).lean()
    return response.json({ records: record.records || [], value: record.value ?? null })
  } catch (error) {
    return next(error)
  }
})

app.get('/api/health', (_request, response) => {
  const connected = mongoose.connection.readyState === 1
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  })
})

const productionDirectory = resolve(serverDirectory, '../dist')
app.use('/uploads', express.static(uploadsDirectory, { maxAge: '30d', immutable: true }))
app.use(express.static(productionDirectory, { maxAge: '1h', index: false }))
app.use((request, response, next) => {
  if (request.method !== 'GET' || request.path.startsWith('/api/') || !request.accepts('html')) return next()
  return response.sendFile(resolve(productionDirectory, 'index.html'))
})

app.use((error, _request, response, _next) => {
  console.error(error.message)
  const status = Number(error.status || error.statusCode) || 500
  response.status(status).json({ message: status === 500 ? 'Internal server error' : error.message })
})

async function startServer() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) throw new Error('MONGODB_URI is not configured')
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_TOKEN_SECRET) throw new Error('Admin authentication is not configured')

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || 'unseen_studios',
    serverSelectionTimeoutMS: 10000,
  })

  app.listen(port, () => {
    console.log(`API server is running on port ${port}`)
    console.log('MongoDB connection established')
  })
}

startServer().catch((error) => {
  let help = ''
  if (/querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message)) help = ' Check your DNS/internet connection and the Atlas cluster hostname.'
  else if (/authentication failed|bad auth/i.test(error.message)) help = ' Check the Atlas database username and password in the root .env file.'
  else if (/server selection|whitelist|allowlist/i.test(error.message)) help = ' Add your current IP address in MongoDB Atlas Network Access.'
  console.error(`Server failed to start: ${error.message}.${help}`)
  process.exit(1)
})

async function shutdown(signal) {
  console.log(`${signal} received; closing MongoDB connection`)
  await mongoose.disconnect()
  process.exit(0)
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))
