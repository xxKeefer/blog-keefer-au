'use client'
import { useEffect, useState } from 'react'

export type Section = {
  id: string
  title: string
}

export function useActiveSection(sections: Section[]): {
  active: Section['id'] | undefined
} {
  const [active, setActive] = useState<Section['id']>()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (mostVisible) {
          setActive(mostVisible.target.id)
        }
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.2],
      }
    )
    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sections])

  return { active }
}
