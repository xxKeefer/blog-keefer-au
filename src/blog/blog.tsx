import { promises as fs } from 'fs'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { default as readingTime } from 'reading-time'

import { Demo } from '~/demos/Demo'
import * as gizmos from '~/demos/gizmos'

import { CodeBlock } from './CodeBlock'

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Frontmatter = {
  title: string
  description: string
  tags: string[]
  publishedDate: string
  lastUpdate?: string
  author?: string
  featuredImage?: string
  draft?: boolean
}

export type Meta = Prettify<
  Frontmatter & {
    slug: string
    updatedDate?: string
    readingTimeMinutes: number
    canonicalUrl?: string
    seo?: {
      title?: string
      description?: string
      keywords?: string[]
      image?: string
      twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
      twitterHandle?: `@${string}`
    }
  }
>

export class Blog {
  public static default_author = 'Daniel John Keefer'
  public static twitter: `@${string}` = '@xxKeefer'
  public static canonical = 'https://keefer.au/'
  private static WPM = 200 // words per minute

  static async one(slug: string) {
    const source = await fs.readFile(
      path.join(process.cwd(), 'src/blog/posts', `${slug}.mdx`),
      'utf-8'
    )

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
      components: {
        Demo,
        // h1: (props) => console.log(props),
        pre: ({ children: { props } }) => {
          const lang = props.className.split('language-')[1]
          return <CodeBlock lang={lang}>{props.children}</CodeBlock>
        }, // for fenced blocks
        ...gizmos,
      },
    })

    const meta = this.enrichMeta(frontmatter, slug, source)

    return { content, meta }
  }

  static async allMeta(): Promise<Meta[]> {
    const filenames = await fs.readdir(
      path.join(process.cwd(), 'src/blog/posts')
    )

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const source = await fs.readFile(
          path.join(process.cwd(), 'src/blog/posts', filename),
          'utf-8'
        )
        const { frontmatter } = await compileMDX<Frontmatter>({
          source,
          options: {
            parseFrontmatter: true,
          },
        })
        const slug = filename.replace('.mdx', '')
        return this.enrichMeta(frontmatter, slug, source)
      })
    )
    return posts.filter(
      ({ draft }) => !(draft && process.env.NODE_ENV === 'production')
    )
  }

  private static enrichMeta(
    frontmatter: Frontmatter,
    slug: string,
    source: string
  ): Meta {
    const readingTimeMinutes = readingTime(source, {
      wordsPerMinute: this.WPM,
    }).minutes
    return {
      ...frontmatter,
      slug,
      readingTimeMinutes,
      author: frontmatter.author ?? this.default_author,
      canonicalUrl: `${this.canonical}/blog/${slug}`,
      seo: {
        title: frontmatter.title,
        description: frontmatter.description,
        keywords: frontmatter.tags,
        twitterCard: 'summary_large_image',
        twitterHandle: this.twitter,
      },
    }
  }

  public static async toNextMetadata(slug: string): Promise<Metadata> {
    const { meta: blog } = await this.one(slug)
    const authors: Metadata['authors'] = blog.author
      ? [{ name: blog.author }, { name: this.default_author }]
      : [{ name: this.default_author }]

    return {
      applicationName: 'keefer.au',
      title: `${blog.title} // DJK`,
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
}
