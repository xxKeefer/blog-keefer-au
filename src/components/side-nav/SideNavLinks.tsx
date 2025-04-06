'use client'

import { ArrowBendDownRight, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { JSX } from 'react'

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
const LevelIconMap = new Map<HeadingLevel, JSX.Element>([
  ['h1', <ArrowRight key={'h1'} size={24} weight="fill" />],
  ['h2', <ArrowRight key={'h2'} size={24} weight="bold" />],
  ['h3', <ArrowBendDownRight key={'h3'} size={24} weight="regular" />],
  ['h4', <ArrowBendDownRight key={'h4'} size={24} weight="regular" />],
  ['h5', <ArrowBendDownRight key={'h5'} size={16} weight="fill" />],
  ['h6', <ArrowBendDownRight key={'h6'} size={16} weight="fill" />],
])
const SurfaceStyleMap = new Map<Props['surface'], string>([
  ['bg-base-300', 'text-base-content fill-base-content'],
  ['bg-secondary', 'text-secondary-content fill-secondary-content'],
])

export const SideNavLinks = ({
  scrollRef,
  closeSideDrawer,
  surface,
}: Props) => {
  const { headings, active } = useHeadings(scrollRef)
  const textColor = SurfaceStyleMap.get(surface)

  return (
    <>
      <h3 className={`${textColor} px-4 pt-8 text-3xl font-bold`}>
        On this Page
      </h3>
      <ul
        className={`${textColor} flex w-full flex-1 flex-col gap-2 overflow-y-auto pt-4 pl-4`}
      >
        {headings?.map((link) => {
          const levelStyle = LevelStyleMap.get(link.level)
          const activeStyles =
            link.id === active
              ? 'font-bold px-2 border-l-8'
              : 'justify-start hover:font-black pl-2 hover:border-b-2 pb-0.5 hover:pb-0'

          return (
            <li
              key={link.id}
              className={`flex flex-row flex-nowrap justify-start gap-2 ${textColor} ${activeStyles} ${levelStyle}`}
            >
              {LevelIconMap.get(link.level)}
              <Link onClick={() => closeSideDrawer?.()} href={link.anchor}>
                {link.overrideLabel ?? link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
