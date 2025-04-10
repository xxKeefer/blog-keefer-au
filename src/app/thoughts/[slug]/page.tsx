import { Metadata } from 'next'

import BlogHeader from '~/blog/BlogHeader'
import { Blog } from '~/blog/blog'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params

  const { content, meta } = await Blog.one(slug)

  return (
    <BlogHeader meta={meta}>
      <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-2xl max-w-(--breakpoint-lg) p-4 sm:p-8 md:px-24 md:py-16 lg:mx-auto">
        {content}
      </article>
    </BlogHeader>
  )
}

export async function generateStaticParams() {
  const blogs = await Blog.allMeta()
  return blogs.map(({ slug }) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  return await Blog.toNextMetadata(slug)
}
