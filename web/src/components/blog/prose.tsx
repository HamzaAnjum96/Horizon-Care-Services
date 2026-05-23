import { cn } from '@/lib/utils'

interface ProseProps {
  html: string
  className?: string
}

export function Prose({ html, className }: ProseProps) {
  const decorated = decorate(html)
  return (
    <div
      className={cn('prose-blog', className)}
      dangerouslySetInnerHTML={{ __html: decorated }}
    />
  )
}

function decorate(html: string): string {
  return [
    wrapReferences,
    tagHelpfulLinks,
    composeLedeBlockquote,
    composeLedePull,
    tagStandalonePulls,
  ].reduce((acc, fn) => fn(acc), html)
}

function wrapReferences(html: string): string {
  const marker = '<h2>Useful references</h2>'
  const i = html.indexOf(marker)
  if (i === -1) return html
  const before = html.slice(0, i + marker.length)
  const after = html.slice(i + marker.length)
  return `${before}<div class="references-block">${after}</div>`
}

// Footnote-style "Helpful link: …" trailing paragraphs.
function tagHelpfulLinks(html: string): string {
  return html.replace(
    /<p>(Helpful links?:\s)/g,
    '<p class="helpful-link">$1',
  )
}

// <p>…:</p> immediately followed by <blockquote>… → wrap as one unit.
function composeLedeBlockquote(html: string): string {
  return html.replace(
    /<p>([^<]{1,90}:)<\/p>\s*<blockquote>([\s\S]*?)<\/blockquote>/g,
    '<div class="lede-block"><p class="lede-kicker">$1</p><blockquote>$2</blockquote></div>',
  )
}

// <p>…:</p> immediately followed by <p><strong>…</strong></p> → wrap as one unit.
function composeLedePull(html: string): string {
  return html.replace(
    /<p>([^<]{1,90}:)<\/p>\s*<p><strong>([^<]+)<\/strong><\/p>/g,
    '<div class="lede-block"><p class="lede-kicker">$1</p><p class="lede-pull">$2</p></div>',
  )
}

// Remaining <p><strong>…</strong></p> (not already wrapped above) → standalone pull-statement.
function tagStandalonePulls(html: string): string {
  return html.replace(
    /<p><strong>([^<]+)<\/strong><\/p>/g,
    '<p class="pull-statement">$1</p>',
  )
}
