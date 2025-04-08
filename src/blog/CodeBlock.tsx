import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

type Props = {
  children: string
  lang: BundledLanguage
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    themes: {
      light: 'catppuccin-frappe',
      dark: 'catppuccin-mocha',
    },
    // theme: 'catppuccin-mocha',
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
}
