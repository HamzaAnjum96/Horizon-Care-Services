import { cn } from '@/lib/utils'

interface ProseProps {
  html: string
  className?: string
}

export function Prose({ html, className }: ProseProps) {
  const decorated = decorateReferences(html)
  return (
    <div
      className={cn('prose-blog', className)}
      dangerouslySetInnerHTML={{ __html: decorated }}
    />
  )
}

function decorateReferences(html: string): string {
  const marker = '<h2>Useful references</h2>'
  const i = html.indexOf(marker)
  if (i === -1) return html
  const before = html.slice(0, i + marker.length)
  const after = html.slice(i + marker.length)
  return `${before}<div class="references-block">${after}</div>`
}
