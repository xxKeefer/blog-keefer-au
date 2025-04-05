import React, { JSX } from 'react'

import { slugify } from './utils'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
  level: HeadingLevel
  className?: string
  children: string
  'data-link-name'?: string
}

const LevelsMap = new Map<
  HeadingLevel,
  (props: Omit<Props, 'level'>) => JSX.Element
>([
  [
    'h1',
    ({ children, className, ...rest }) => (
      <h1
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h1>
    ),
  ],
  [
    'h2',
    ({ children, className, ...rest }) => (
      <h2
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h2>
    ),
  ],
  [
    'h3',
    ({ children, className, ...rest }) => (
      <h3
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h3>
    ),
  ],
  [
    'h4',
    ({ children, className, ...rest }) => (
      <h4
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h4>
    ),
  ],
  [
    'h5',
    ({ children, className, ...rest }) => (
      <h5
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h5>
    ),
  ],
  [
    'h6',
    ({ children, className, ...rest }) => (
      <h6
        id={slugify(children)}
        className={`scroll-mt-16 ${className}`}
        data-link-name={rest['data-link-name']}
      >
        {children}
      </h6>
    ),
  ],
])

export const Heading = ({ level, ...props }: Props) => {
  const Anchor = LevelsMap.get(level)!
  return <Anchor {...props} />
}
