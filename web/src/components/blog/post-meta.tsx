import { formatDate } from '@/lib/blog'

interface PostMetaProps {
  date: string
  author: string
  readTime: number
  category?: string
}

export function PostMeta({ date, author, readTime, category }: PostMetaProps) {
  return (
    <div className="border-t-2 border-amber pt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[12px] tracking-[0.1em] uppercase text-ink-muted-dark">
      <time dateTime={date} className="font-medium text-ink-dark">
        {formatDate(date)}
      </time>
      <span aria-hidden="true" className="text-ink-muted-dark/40">·</span>
      <span>
        By <span className="text-ink-dark font-medium normal-case tracking-normal text-[13px]">{author}</span>
      </span>
      <span aria-hidden="true" className="text-ink-muted-dark/40">·</span>
      <span>{readTime} min read</span>
      {category && (
        <>
          <span aria-hidden="true" className="text-ink-muted-dark/40">·</span>
          <span>{category}</span>
        </>
      )}
    </div>
  )
}
