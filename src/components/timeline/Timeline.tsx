import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Timeline = ({ children }: Props) => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {children}
    </ul>
  )
}
