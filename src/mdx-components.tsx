import type { MDXComponents } from 'mdx/types'

import * as gizmos from '~/demos/gizmos'

import { CodeBlock } from './blog/CodeBlock'
import { Heading } from './blog/Heading'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <Heading level="h1">{children}</Heading>,
    h2: ({ children }) => <Heading level="h2">{children}</Heading>,
    h3: ({ children }) => <Heading level="h3">{children}</Heading>,
    h4: ({ children }) => <Heading level="h4">{children}</Heading>,
    h5: ({ children }) => <Heading level="h5">{children}</Heading>,
    h6: ({ children }) => <Heading level="h6">{children}</Heading>,
    pre: ({ children }) => {
      const content = children.props.children
      const lang = children.props.className.split('language-')[1]
      return <CodeBlock lang={lang}>{content}</CodeBlock>
    },
    ...gizmos,
    ...components,
  }
}
