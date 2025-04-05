import { Metadata } from 'next'

import { Blogs } from '~/blog/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const blogs = await Blogs.init() // safe after init()
  const blog = blogs.findBySlug(slug)
  if (!blog) return <h1>404</h1>
  const { Content, meta } = blog
  console.log({ meta })
  return (
    <main className="prose prose-sm sm:prose-base md:prose-lg lg:prose-2xl max-w-(--breakpoint-lg) p-4 sm:p-8 md:px-24 md:py-16 lg:mx-auto">
      <Content />
    </main>
  )
}

export async function generateStaticParams() {
  const blogs = await Blogs.init()
  return blogs.slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blogs = await Blogs.init() // safe after init()
  const post = blogs.findBySlug(slug)
  return Blogs.toNextMetadata(post!.meta)
}
