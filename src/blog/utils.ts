export function slugify(text: string): string {
  return text
    .normalize('NFKD') // Normalize accents
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
}
