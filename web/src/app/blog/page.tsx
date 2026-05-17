import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { getAllPosts, formatDate } from '@/lib/blog'

const siteUrl = 'https://www.horizoncareservices.org'

export const metadata: Metadata = {
  title: { absolute: 'Writing — Horizon Care Services' },
  description:
    'Articles, notes, and field experience from the team at Horizon Care Services. Practical guidance for families, referrers, and healthcare professionals.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'Writing — Horizon Care Services',
    description:
      'Articles, notes, and field experience from the team at Horizon Care Services.',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    acc[year] = acc[year] || []
    acc[year].push(post)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <>
      <PageHeader
        kicker="Writing"
        title="Articles, notes, and field experience."
        intro="Plain-English guidance from people who do this work every day. Written for families weighing decisions and for referrers who need to understand what good care actually looks like."
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="text-ink-muted-dark text-[15px]">No articles yet.</p>
          ) : (
            <div className="space-y-20 lg:space-y-28">
              {years.map((year) => (
                <YearBlock key={year} year={year} posts={byYear[year]} isFirstYear={year === years[0]} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function YearBlock({
  year,
  posts,
  isFirstYear,
}: {
  year: string
  posts: Awaited<ReturnType<typeof getAllPosts>>
  isFirstYear: boolean
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p
          className="font-display text-ink-muted-dark/60 leading-none tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontVariationSettings: '"opsz" 64, "wght" 400',
          }}
        >
          {year}
        </p>
        <p className="section-kicker text-ink-muted-dark mt-3">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <ol className="border-t border-rule-light">
        {posts.map((post, idx) => (
          <li key={post.slug} className="border-b border-rule-light">
            <PostRow post={post} isNewest={isFirstYear && idx === 0} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function PostRow({
  post,
  isNewest,
}: {
  post: Awaited<ReturnType<typeof getAllPosts>>[number]
  isNewest: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-8 lg:py-10 transition-colors hover:bg-cream-dim/60"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
        <time
          dateTime={post.date}
          className="text-[12px] tracking-[0.1em] uppercase text-ink-muted-dark font-medium"
        >
          {formatDate(post.date)}
        </time>
        <span aria-hidden="true" className="text-ink-muted-dark/40 text-[12px]">·</span>
        <span className="text-[12px] tracking-[0.1em] uppercase text-ink-muted-dark">
          {post.category}
        </span>
        {isNewest && (
          <span className="ml-1 inline-flex items-center text-[10px] tracking-[0.16em] uppercase font-semibold text-amber border border-amber/60 px-2 py-0.5 rounded-sm">
            New
          </span>
        )}
      </div>

      <h2
        className="font-display text-ink-dark leading-[1.1] tracking-[-0.02em] mb-4 max-w-[28ch] transition-colors group-hover:text-amber"
        style={{
          fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)',
          fontVariationSettings: '"opsz" 36, "wght" 580',
        }}
      >
        {post.title}
      </h2>

      <p className="text-ink-muted-dark text-[15px] leading-relaxed max-w-[60ch] mb-5">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-2 text-[13px] text-ink-muted-dark">
        <span>By <span className="text-ink-dark">{post.author}</span></span>
        <span aria-hidden="true" className="text-ink-muted-dark/40">·</span>
        <span>{post.readTime} min read</span>
        <span className="ml-auto inline-flex items-center gap-1 text-ink-dark group-hover:text-amber transition-colors">
          Read article <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
