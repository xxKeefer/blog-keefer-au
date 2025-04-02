'use client'

import { ArrowFatLineRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type SideNavLink = { id: string; label: string }
type Props = {
  links: SideNavLink[]
  closeSideDrawer?: () => void
  dark?: boolean
}
export const SideNavLinks = ({ links, closeSideDrawer, dark }: Props) => {
  const [active, setActive] = useState<string>()

  const darkText = dark ? 'text-secondary-content' : ''
  const darkActive = dark ? 'btn-soft' : 'btn-neutral'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            intersectionRatio: entry.intersectionRatio,
            height: entry.boundingClientRect.height,
          }))

        if (visibleSections.length > 0) {
          // Prioritize the section that is either:
          // 1. The largest (if multiple are in view)
          // 2. The one most visible
          const activeSection = visibleSections.reduce((prev, curr) =>
            curr.height > prev.height ||
            curr.intersectionRatio > prev.intersectionRatio
              ? curr
              : prev
          )

          setActive(activeSection.id)
        }
      },
      { threshold: [0, 0.5], rootMargin: '-50% 0px -50% 0px' }
    )

    links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => observer.observe(el!))

    document.querySelectorAll('.section').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [links])

  return (
    <nav className="flex flex-col gap-4">
      <h3 className={`text-3xl font-bold ${darkText}`}>On this Page</h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              onClick={() => closeSideDrawer?.()}
              href={`#${link.id}`}
              className={`btn btn-block text-xl ${link.id === active ? `${darkActive} justify-center font-bold` : `btn-ghost ${darkText} justify-start`}`}
            >
              <span className="flex items-center gap-2">
                <ArrowFatLineRight size={24} weight="fill" />
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
