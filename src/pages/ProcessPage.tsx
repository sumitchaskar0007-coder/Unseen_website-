import { Process } from '../components/sections/Process'
import { usePageContent } from '../data/pageContent'

export function ProcessPage() {
  const content = usePageContent('process')

  return (
    <div className="pt-6 md:pt-8">
      <Process content={content} />
    </div>
  )
}
