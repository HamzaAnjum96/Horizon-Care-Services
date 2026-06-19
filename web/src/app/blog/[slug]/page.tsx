import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Prose } from '@/components/blog/prose'
import { PostMeta } from '@/components/blog/post-meta'
import { getAllPosts, getAllSlugs, getPost, formatDate } from '@/lib/blog'

const siteUrl = 'https://www.horizoncareservices.org'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article not found' }

  return {
    title: { absolute: `${post.title} — Horizon Care Services` },
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/brand/hcs-og-card.png', width: 1200, height: 630, alt: 'Horizon Care Services — healthcare staffing across England' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/brand/hcs-og-card.png'],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    dateModified: post.date,
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    articleSection: post.category,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHeader
        kicker={post.category}
        title={post.title}
        intro={post.excerpt}
        showGrid={false}
      />

      <article className="bg-cream pt-12 lg:pt-16 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-[68ch] mx-auto">
            <PostMeta
              date={post.date}
              author={post.author}
              readTime={post.readTime}
              category={post.category}
            />

            <div className="mt-12 lg:mt-16">
              <Prose html={post.html} />
            </div>

            <hr className="my-16 border-rule-light" />

            <div className="grid sm:grid-cols-2 gap-8 items-start">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[14px] text-ink-muted-dark hover:text-ink-dark transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
                All articles
              </Link>

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group block sm:text-right border-l sm:border-l-0 sm:border-r-0 border-rule-light sm:pl-0"
                >
                  <p className="section-kicker text-ink-muted-dark mb-2">Next article</p>
                  <p
                    className="font-display text-ink-dark leading-snug tracking-[-0.015em] group-hover:text-amber transition-colors inline-flex items-baseline gap-2"
                    style={{
                      fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                      fontVariationSettings: '"opsz" 20, "wght" 580',
                    }}
                  >
                    {nextPost.title}
                    <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                  <p className="text-[12px] tracking-[0.1em] uppercase text-ink-muted-dark mt-2">
                    {formatDate(nextPost.date)}
                  </p>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
