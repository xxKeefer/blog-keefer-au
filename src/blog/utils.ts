import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { SideNavLink } from '~/components/side-nav'
export type Meta = {
  slug: string
  title: string
  tags: string[]
  lastUpdated: string
  next?: string
  prev?: string
  related?: string[]
  anchors?: SideNavLink[]
}
type Raw = Omit<Meta, 'slug'>

export async function getAllPostMeta(): Promise<Meta[]> {
  // Resolve absolute path to the blog directory
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dir = path.join(__dirname)

  const files = await readdir(dir)
  const mdx = files.filter((file) => path.extname(file) === '.mdx')
  const data = mdx.map(async (file) => {
    try {
      const { meta } = await import(`./${file}`)
      const slugged: Meta = { ...(meta as Raw), slug: file.split('.')[0] }
      return slugged
    } catch (error) {
      console.error(`Failed to import ${file}:`, error)
      return null
    }
  })

  const results = await Promise.all(data)
  return results.filter((item): item is Meta => item !== null)
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD') // Normalize accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
}
