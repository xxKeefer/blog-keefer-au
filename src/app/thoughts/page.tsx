import Link from 'next/link'

import { Blogs } from '~/blog/utils'

export default async function Page() {
  const blogs = await Blogs.init()

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Here are my thoughts on:</p>
          <ul className="flex flex-col gap-4">
            {blogs.posts.map(({ meta }) => {
              return (
                <Link
                  key={meta.slug}
                  className="link"
                  href={`/thoughts/${meta.slug}`}
                >
                  {meta.title}
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
