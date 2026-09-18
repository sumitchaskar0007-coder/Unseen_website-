import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../api'
import { cmsService } from '../services/cmsService'
import { onlineImages } from '../data/onlineImages'
import './blog-premium.css'

interface BlogItem {
  _id: string
  title: string
  slug: string
  content: string
  featuredImage: string
  author: string
  readingTime: number
  tags: string[]
  createdAt: string
  category?: string
}

const fallbackPosts: BlogItem[] = [
  { _id: 'brand-distinction', title: 'Why distinct brands outperform loud ones', slug: 'brand-distinction', content: 'A useful brand is not the one that says the most. It is the one people recognise, understand and remember.', featuredImage: onlineImages.businessPlanning, author: 'Unseen Studios', readingTime: 4, tags: ['Branding'], category: 'Perspective', createdAt: '2026-08-28' },
  { _id: 'films-people-watch', title: 'Making a brand film people choose to watch', slug: 'films-people-watch', content: 'The best brand films earn attention through a human idea, a confident point of view and disciplined craft.', featuredImage: onlineImages.cameraOperator, author: 'Unseen Studios', readingTime: 5, tags: ['Film'], category: 'Craft', createdAt: '2026-08-12' },
  { _id: 'websites-for-momentum', title: 'Designing websites for momentum, not decoration', slug: 'websites-for-momentum', content: 'A modern website should make the next decision feel obvious—for the visitor and for the business.', featuredImage: onlineImages.developerWorkspace, author: 'Unseen Studios', readingTime: 6, tags: ['Web'], category: 'Growth', createdAt: '2026-07-24' },
]

const plainText = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let active = true
    const load = async () => {
      await cmsService.sync('blogs').catch(() => [])
      const localBlogs: BlogItem[] = cmsService.published('blogs').map((item) => ({
        _id: item.id,
        title: String(item.name || 'Untitled article'),
        slug: String(item.slug || item.id),
        content: String(item.description || item.shortDescription || ''),
        featuredImage: String(item.image || onlineImages.businessPlanning),
        author: String(item.author || 'Unseen Studios'),
        readingTime: Math.max(1, Math.ceil(plainText(String(item.description || '')).split(/\s+/).length / 200)),
        tags: String(item.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
        category: String(item.category || 'Perspective'),
        createdAt: String(item.publishDate || new Date().toISOString()),
      }))
      try {
        const response = await blogAPI.getAll()
        const apiBlogs: BlogItem[] = response.data || []
        if (active) setBlogs([...localBlogs, ...apiBlogs.filter((post) => !localBlogs.some((local) => local._id === post._id))])
      } catch {
        if (active) setBlogs(localBlogs)
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => { active = false }
  }, [])

  const posts = blogs.length ? blogs : fallbackPosts
  const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category || post.tags[0] || 'Perspective')))]
  const visible = useMemo(() => filter === 'All' ? posts : posts.filter((post) => (post.category || post.tags[0]) === filter), [filter, posts])
  const [featured, ...rest] = visible

  return (
    <div className="journal-page">
      <section className="journal-intro">
        <div className="journal-shell">
          <p className="journal-kicker">Ideas & perspective</p>
          <div className="journal-intro-grid">
            <h1>Thinking behind<br /><em>the making.</em></h1>
            <p>Notes on branding, storytelling, technology and growth from the people doing the work.</p>
          </div>
        </div>
      </section>

      <main className="journal-main">
        <div className="journal-shell">
          <div className="journal-toolbar" aria-label="Filter articles">
            {categories.map((category) => <button type="button" className={filter === category ? 'is-active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}
          </div>

          {loading && !blogs.length ? <div className="journal-loading">Loading the journal…</div> : featured ? (
            <>
              <Link to={`/blog/${featured.slug}`} className="journal-feature">
                <div className="journal-feature-image"><img src={featured.featuredImage} alt={featured.title} /></div>
                <div className="journal-feature-copy">
                  <div className="journal-meta"><span>{featured.category || featured.tags[0] || 'Perspective'}</span><span>{new Date(featured.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                  <h2>{featured.title}</h2>
                  <p>{plainText(featured.content).slice(0, 190)}{plainText(featured.content).length > 190 ? '…' : ''}</p>
                  <div className="journal-byline"><span>By {featured.author}</span><span><Clock3 /> {featured.readingTime} min read</span></div>
                  <strong>Read the story <ArrowUpRight /></strong>
                </div>
              </Link>

              {rest.length > 0 && <div className="journal-grid">
                {rest.map((post, index) => <Link to={`/blog/${post.slug}`} className={`journal-card ${index % 5 === 0 ? 'is-wide' : ''}`} key={post._id}>
                  <div className="journal-card-image"><img src={post.featuredImage} alt={post.title} loading="lazy" /><span><ArrowUpRight /></span></div>
                  <div className="journal-meta"><span>{post.category || post.tags[0] || 'Perspective'}</span><span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                  <h2>{post.title}</h2>
                  <p>{plainText(post.content).slice(0, 130)}{plainText(post.content).length > 130 ? '…' : ''}</p>
                  <span className="journal-read-link">Read article <ArrowRight /></span>
                </Link>)}
              </div>}
            </>
          ) : <div className="journal-empty">No articles in this category yet.</div>}
        </div>
      </main>
    </div>
  )
}
