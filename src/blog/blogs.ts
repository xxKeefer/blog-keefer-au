import { type } from 'arktype'
import { readdir, readFile } from 'fs/promises'
import { MDXContent } from 'mdx/types'
import type { Metadata } from 'next'
import path from 'path'
import { default as readingTime } from 'reading-time'
import { fileURLToPath } from 'url'

import { slugify } from './utils'

const minimalMeta = type({
  'slug?': 'string',
  title: 'string',
  description: 'string',
  tags: 'string[]',
  publishedDate: /\d{4}-\d{2}-\d{2}/,
  'lastUpdate?': /\d{4}-\d{2}-\d{2}/,
  'author?': 'string',
  'featuredImage?': 'string',
  'draft?': 'boolean',
  readingTimeMinutes: 'number',
})

export type MinimalMeta = typeof minimalMeta.infer

export type Meta = {
  title: string
  description: string
  author?: string // me by default
  publishedDate: string
  updatedDate?: string
  tags: string[]
  readingTimeMinutes: number
  slug: string // You could make this more specific if needed
  featuredImage?: string
  canonicalUrl?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    image?: string
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
    twitterHandle?: `@${string}`
  }
  draft?: boolean
}

type RawBlog = {
  meta: MinimalMeta
  Content: MDXContent
}
type Blog = {
  meta: Meta
  Content: MDXContent
}

export class Blogs {
  private static instance: Blogs | null = null
  public posts: Blog[]
  public static default_author = 'Daniel John Keefer'
  public static twitter: `@${string}` = '@xxKeefer'
  public static canonical = 'https://keefer.au/'
  private static WPM = 200 // words per minute

  private constructor(posts: Blog[]) {
    this.posts = posts
  }

  private static async loadBlogs(): Promise<RawBlog[]> {
    // Resolve absolute path to the blog directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const dir = path.join(__dirname)

    const files = await readdir(dir)
    const mdx = files.filter((file) => path.extname(file) === '.mdx')
    const data = mdx.map(async (file) => {
      try {
        const { default: Content, meta: raw } = await import(`./${file}`)
        const source = await readFile(`${dir}/${file}`, 'utf8')
        const readingTimeMinutes = readingTime(source, {
          wordsPerMinute: this.WPM,
        }).minutes
        const meta = minimalMeta({ ...raw, readingTimeMinutes })

        if (meta instanceof type.errors) {
          console.error(`${file} has malformed meta: ${meta.summary}`)
          return null
        }

        return { meta, Content }
      } catch (error) {
        console.error(`Failed to import ${file}:`, error)
        return null
      }
    })

    const results = await Promise.all(data)
    return results.filter((item): item is Blog => item !== null)
  }

  static async init(): Promise<Blogs> {
    if (this.instance) return this.instance

    const blogs = await this.loadBlogs()
    const enriched = blogs.map(({ Content, meta }) =>
      this.enrichMeta(meta, Content)
    )
    this.instance = new Blogs(enriched)
    return this.instance
  }

  static get sync(): Blogs {
    if (!this.instance) {
      throw new Error(
        'Blogs not initialized yet. Call await Blogs.init() first.'
      )
    }
    return this.instance
  }

  private static enrichMeta(min: MinimalMeta, Content: MDXContent): Blog {
    const meta: Meta = {
      ...min,
      slug: min.slug ?? slugify(min.title),
      author: min.author ?? this.default_author,
      canonicalUrl: `${this.canonical}/blog/${min.slug}`,
      seo: {
        title: min.title,
        description: min.description,
        keywords: min.tags,
        twitterCard: 'summary_large_image',
        twitterHandle: this.twitter,
      },
    }
    return { Content, meta }
  }

  public static toNextMetadata(blog: Meta): Metadata {
    const authors: Metadata['authors'] = blog.author
      ? [{ name: blog.author }, { name: this.default_author }]
      : [{ name: this.default_author }]

    return {
      applicationName: 'keefer.au',
      title: `${blog.title} | DJK`,
      description: blog.description,
      authors,
      creator: blog.author ?? this.default_author,
      publisher: this.default_author,
      referrer: 'origin-when-cross-origin',
      keywords: blog.tags ?? [],
      metadataBase: new URL('https://keefer.au'),

      alternates: {
        canonical: blog.canonicalUrl,
      },

      openGraph: {
        title: blog.title,
        description: blog.description,
        url: blog.canonicalUrl,
        siteName: 'keefer.au',
        type: 'article',
        publishedTime: blog.publishedDate, // optional
        authors: [blog.author ?? this.default_author],
        images: blog.featuredImage
          ? [
              {
                url: blog.featuredImage,
                alt: blog.title,
              },
            ]
          : undefined,
      },

      twitter: {
        card: blog.featuredImage ? 'summary_large_image' : 'summary',
        title: blog.title,
        description: blog.description,
        images: blog.featuredImage ? [blog.featuredImage] : undefined,
        creator: this.twitter,
      },

      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },

      category: blog.tags?.[0], // optional top-level category
    }
  }

  get slugs(): string[] {
    return this.posts.map(({ meta }) => meta.slug)
  }

  findBySlug(slug: string): Blog | undefined {
    return this.posts.find(({ meta }) => meta.slug === slug)
  }
}
