import { ArrowFatLineRight, BookOpenText } from '@phosphor-icons/react/dist/ssr'
import { minutesToSeconds } from 'date-fns'
import Link from 'next/link'
import React from 'react'

import { Meta } from './blog'

type Props = {
  meta: Meta
}

export const BlogCard = ({ meta }: Props) => {
  const mins = meta.readingTimeMinutes
  const seconds = mins % 1
  const minutes = Math.floor(mins)
  const readTime = `~ ${minutes}m ${minutesToSeconds(seconds)}s`
  return (
    <li className="card card-border bg-base-300 not-dark:bg-secondary not-dark:text-secondary-content card-xl">
      <div className="card-body p-4">
        <div className="flex flex-col items-start justify-start gap-2 pb-2">
          <h2 className="card-title font-bold tracking-wider">{meta.title}</h2>
          <p className="text-left">
            <span className="font-emoji pr-2">🧙‍♂️✨</span>
            {meta.description}
          </p>
        </div>
        <div className="card-actions items-end justify-between">
          <span className="flex content-center gap-2 py-1.5 text-sm">
            <BookOpenText size={16} weight="bold" />
            {readTime}
          </span>
          <Link
            key={meta.slug}
            className="btn btn-ghost items-center"
            href={`/thoughts/${meta.slug}`}
          >
            Have a read
            <ArrowFatLineRight size={20} weight="fill" />
          </Link>
        </div>
      </div>
    </li>
  )
}
