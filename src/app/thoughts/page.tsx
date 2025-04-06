// import Link from 'next/link'

import { BlogCard } from '~/blog/BlogCard'
import { Blogs } from '~/blog/blogs'

export default async function Page() {
  const blogs = await Blogs.init()

  return (
    <div className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      <div className="max-w-2xl">
        <div className="flex flex-col items-center gap-4 p-8">
          <span className="font-emoji text-9xl">🧠</span>
          <h1 className="text-5xl font-bold">
            <span className="font-emoji animate-hand-wave inline-block">
              👋
            </span>
            Hello there
          </h1>
          <h2 className="font-display text-3xl">Just some of my thoughts...</h2>
        </div>
        <ul className="flex flex-col gap-4">
          {blogs.posts.map(({ meta }) => {
            return <BlogCard key={meta.slug} meta={meta} />
          })}
        </ul>
      </div>
    </div>
  )
}
