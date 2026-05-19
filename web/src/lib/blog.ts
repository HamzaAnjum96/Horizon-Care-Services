import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostFrontmatter = {
  title: string
  date: string
  author: string
  category: string
  excerpt: string
}

export type PostSummary = PostFrontmatter & {
  slug: string
  readTime: number
}

export type Post = PostSummary & {
  html: string
}

const WORDS_PER_MINUTE = 220

function calcReadTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

async function readPostFile(slug: string) {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  const fm = data as Partial<PostFrontmatter>
  if (!fm.title || !fm.date || !fm.author || !fm.category || !fm.excerpt) {
    throw new Error(`Post "${slug}" is missing required frontmatter (title, date, author, category, excerpt).`)
  }
  return {
    slug,
    title: fm.title,
    date: new Date(fm.date).toISOString(),
    author: fm.author,
    category: fm.category,
    excerpt: fm.excerpt,
    readTime: calcReadTime(content),
    body: content,
  }
}

export async function getAllPosts(): Promise<PostSummary[]> {
  let entries: string[] = []
  try {
    entries = await fs.readdir(CONTENT_DIR)
  } catch {
    return []
  }
  const slugs = entries.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { body, ...summary } = await readPostFile(slug)
      void body
      return summary
    }),
  )
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { body, ...rest } = await readPostFile(slug)
    const html = await marked.parse(body, { async: true, gfm: true, breaks: false })
    return { ...rest, html }
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })
}
