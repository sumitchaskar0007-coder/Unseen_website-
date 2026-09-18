import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { EditablePageSection } from '../data/pageContent'

export function EditablePageSections({ sections }: { sections: EditablePageSection[] }) {
  if (!sections.length) return null

  return (
    <section className="editable-page-sections" aria-label="Additional page content">
      <div className="editable-page-sections__inner">
        {sections.map((section, index) => (
          <article className={section.image ? 'has-image' : ''} key={section.id}>
            {section.image && <img src={section.image} alt="" />}
            <div>
              <p className="editable-page-sections__eyebrow">{section.eyebrow || `Section ${String(index + 1).padStart(2, '0')}`}</p>
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.linkLabel && section.linkUrl && (
                <Link to={section.linkUrl}>{section.linkLabel}<ArrowUpRight /></Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
