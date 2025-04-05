'use client'

// import { ArrowFatLineRight } from '@phosphor-icons/react'
import Link from 'next/link'

import { HeadingLevel } from '~/blog/Heading'
import { useHeadings } from '~/hooks/useHeadings'

type Props = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  closeSideDrawer?: () => void
  /** only these two for now add as needed */
  surface: 'bg-base-300' | 'bg-secondary'
}

const LevelStyleMap = new Map<HeadingLevel, string>([
  ['h1', 'text-xl'],
  ['h2', 'text-lg ml-4 '],
  ['h3', 'text-md ml-8 '],
  ['h4', 'text-sm ml-12 '],
  ['h5', 'text-sm ml-16 '],
  ['h6', 'text-xs ml-20 '],
])
const SurfaceStyleMap = new Map<Props['surface'], string>([
  ['bg-base-300', 'text-base-content'],
  ['bg-secondary', 'text-secondary-content'],
])

export const SideNavLinks = ({
  scrollRef,
  closeSideDrawer,
  surface,
}: Props) => {
  const { headings, active } = useHeadings(scrollRef)
  const textColor = SurfaceStyleMap.get(surface)

  return (
    <nav className="flex flex-col gap-4">
      <h3 className={`${textColor} text-3xl font-bold`}>On this Page</h3>
      <ul className="flex w-full flex-col gap-2">
        {headings?.map((link) => {
          const levelStyle = LevelStyleMap.get(link.level)
          const activeStyles =
            link.id === active
              ? 'font-bold px-2 -ml-8 border-l-8'
              : 'justify-start hover:font-black hover:border-b-2'

          return (
            <li
              key={link.id}
              className={`${textColor} ${activeStyles} ${levelStyle} `}
            >
              <Link
                onClick={() => closeSideDrawer?.()}
                href={link.anchor}
                className="![background-color:transparent]"
              >
                {link.overrideLabel ?? link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
