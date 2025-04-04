import { getAllPostMeta } from '~/blog/utils'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`~/blog/${slug}.mdx`)

  return (
    <main className="prose prose-sm sm:prose-base md:prose-lg lg:prose-2xl max-w-(--breakpoint-lg) p-4 sm:p-8 md:px-24 md:py-16 lg:mx-auto">
      <Post />
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPostMeta()
  return posts.map(({ slug }) => ({ slug }))
}

export const dynamicParams = false
