export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`~/blog/${slug}.mdx`)

  return <Post />
}

export function generateStaticParams() {
  return [{ slug: 'on-writing-tests' }]
}

export const dynamicParams = false
