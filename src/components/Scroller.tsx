import React, { ReactNode } from 'react'

type ScrollerProps = {
  children: ReactNode
  direction?: 'right' | 'down' | 'left' | 'up'
  className?: string
}

const flexMap = {
  left: 'flex-row',
  up: 'flex-col max-h-full',
  right: 'flex-row',
  down: 'flex-col max-h-full',
} as const satisfies Record<NonNullable<ScrollerProps['direction']>, string>
const animateMap = {
  left: 'animate-scroll-left',
  up: 'animate-scroll-up',
  right: 'animate-scroll-right',
  down: 'animate-scroll-down',
} as const satisfies Record<NonNullable<ScrollerProps['direction']>, string>
export const Scroller = ({
  children,
  direction = 'right',
  className,
}: ScrollerProps) => {
  const flexDir = flexMap[direction]
  const animateDir = animateMap[direction]
  return (
    <div className={`flex ${flexDir} overflow-hidden ${className}`}>
      <div className={`flex ${flexDir} gap-24 ${animateDir}`}>
        {children}
        {children}
      </div>
    </div>
  )
}
