import {
  BookOpenText,
  CalendarBlank,
  DotOutline,
  PencilLine,
} from '@phosphor-icons/react/dist/ssr'
import { format, minutesToSeconds } from 'date-fns'
import React, { ReactNode } from 'react'

import { Meta } from './blogs'

type Props = {
  meta: Meta
  children: ReactNode
}

const BlogHeader = ({ meta, children }: Props) => {
  const {
    title,
    readingTimeMinutes: mins,
    description,
    publishedDate,
    tags,
    author,
    updatedDate,
    draft,
  } = meta
  const date = format(updatedDate ?? publishedDate, 'iii, ii MMM yyyy')
  const seconds = mins % 1
  const minutes = Math.floor(mins)
  const readTime = `~ ${minutes}m ${minutesToSeconds(seconds)}s`
  return (
    <main>
      {draft && (
        <div className="bg-warning sticky top-0 w-full p-1 text-center font-black capitalize">
          this post is a draft
        </div>
      )}
      <div className="bg-base-300">
        <div className="prose md:prose-2xl max-w-(--breakpoint-lg) p-4 pt-8 sm:p-8 md:px-24 md:pt-16 md:pb-8 lg:mx-auto">
          <div className="flex-col place-items-start">
            <h1 className="mb-8 text-5xl font-black tracking-wide md:text-7xl">
              {title}
            </h1>
            <p className="!text-base-content font-display not-dark:bg-neutral not-dark:text-neutral-content mb-4 text-xl tracking-wider not-dark:rounded-2xl not-dark:px-4 not-dark:py-2 md:text-3xl">
              <span className="font-emoji pr-2">🧙‍♂️✨</span>
              {description}
            </p>
            <p className="2xs:gap-2 mb-2 flex justify-items-end gap-4 justify-self-end text-xs sm:gap-4 md:text-sm">
              <span className="flex content-center gap-2">
                <PencilLine
                  className="hidden sm:block"
                  size={16}
                  weight="bold"
                />
                {author}
              </span>
              <DotOutline className="2xs:block hidden sm:hidden" size={16} />
              <span className="flex content-center gap-2">
                <CalendarBlank
                  className="hidden sm:block"
                  size={16}
                  weight="bold"
                />
                {date}
              </span>
              <DotOutline className="2xs:block hidden sm:hidden" size={16} />
              <span className="flex content-center gap-2">
                <BookOpenText
                  className="hidden sm:block"
                  size={16}
                  weight="bold"
                />
                {readTime}
              </span>
            </p>
            <div className="2xs:flex-nowrap 2xs:gap-4 flex flex-wrap justify-items-end gap-2 justify-self-end">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="badge badge-xs 2xs:badge-sm md:badge-md badge-accent first-of-type:badge-primary font-mono tracking-wider"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </main>
  )
}

export default BlogHeader
