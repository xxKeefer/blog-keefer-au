import { useEffect, useState } from 'react'

import { HeadingLevel } from '~/blog/Heading'

type Heading = {
  id: string
  anchor: string
  label: string
  overrideLabel: string | undefined
  level: HeadingLevel
}

type AugmentedHeadingElement = HTMLHeadElement & {
  'data-link-name'?: string
}

export const useHeadings = (
  scrollRef: React.RefObject<HTMLDivElement | null>
) => {
  const [headings, setHeadings] = useState<Heading[]>()
  const [active, setActive] = useState<string>()

  useEffect(() => {
    const container = scrollRef.current
    const onEvent = () => handleScroll(container, setHeadings, setActive)

    container?.addEventListener('scroll', onEvent, { passive: true })
    onEvent() // Set initial active heading
    return () => {
      container?.removeEventListener('scroll', onEvent)
    }
  }, [scrollRef])

  return { headings, active }
}

const collectHeadings = (): AugmentedHeadingElement[] => {
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
  return tags
    .flatMap((tag) => Array.from(document.getElementsByTagName(tag)))
    .filter((h) => Boolean(h.id))
    .sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )
}

const handleScroll = (
  container: HTMLDivElement | null,
  setHeadings: (update: Heading[] | undefined) => void,
  setActive: (update: string | undefined) => void
) => {
  if (container) {
    const els = collectHeadings()
    setHeadings(
      els.map(({ id, innerText, localName, dataset }) => ({
        id,
        anchor: `#${id}`,
        label: innerText,
        overrideLabel: dataset.linkName,
        level: localName as HeadingLevel,
      }))
    )
    const scrollTop = container.scrollTop
    const viewportHeight = container.clientHeight

    const entries = els.map((el) => {
      const top = el.getBoundingClientRect().top
      const bottom = el.getBoundingClientRect().bottom
      return {
        id: el.id,
        top,
        bottom,
        isVisible: bottom > 0 && top < viewportHeight,
      }
    })

    const visible = entries.filter((e) => e.isVisible)

    let activeId: string | undefined
    if (visible.length > 0 && viewportHeight - scrollTop < 150) {
      activeId = [...visible].pop()!.id
    } else if (visible.length > 0) {
      // Pick the one closest to the top of the viewport
      activeId = visible.reduce((prev, curr) =>
        Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
      ).id
    } else if (visible.length > 0) {
      // Pick the one closest to the top of the viewport
      activeId = visible.reduce((prev, curr) =>
        Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
      ).id
    } else {
      // Nothing visible — fallback to the closest heading above scrollTop
      const scrollPosition = scrollTop + 1 // +1 so exact matches aren't skipped
      const above = els
        .filter((el) => el.offsetTop < scrollPosition)
        .sort((a, b) => b.offsetTop - a.offsetTop) // closest above first

      activeId = above[0]?.id
    }

    if (activeId) setActive(activeId)
  }
}
