import React, { ReactNode } from 'react'
// import { Dot } from "../Dot";

type EventProps = {
  marker: ReactNode
  color: 'primary' | 'secondary' | 'accent'
  title: string
  time: string
  children: ReactNode
  side: 'left' | 'right'
}

const colourMap = {
  accent: 'bg-accent',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
} as const satisfies Record<EventProps['color'], string>

export const Event = ({
  children,
  marker,
  side,
  time,
  title,
  color,
}: EventProps) => {
  return (
    <li>
      <div
        className={`timeline-middle font-emoji m-2 p-2 text-xl ${colourMap[color]} rounded-full`}
      >
        {marker}
      </div>
      <div
        className={`${side === 'left' ? 'timeline-start' : 'timeline-end'} mb-8 md:mb-0 ${side === 'left' ? 'md:text-end' : ''} `}
      >
        <time className="font-mono italic">{time}</time>
        <div className="text-xl font-black md:text-2xl">{title}</div>
        {children}
      </div>
      <hr className="bg-base-content" />
    </li>
  )
}
