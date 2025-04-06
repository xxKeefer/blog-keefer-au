import { ArrowFatLineRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

type Props = {
  closeSideDrawer?: () => void
  /** only these two for now add as needed */
  surface: 'bg-base-300' | 'bg-secondary'
}

const SurfaceStyleMap = new Map<Props['surface'], string>([
  ['bg-base-300', 'text-base-content fill-base-content'],
  ['bg-secondary', 'text-secondary-content fill-secondary-content'],
])

export const SideNavLinks = ({ closeSideDrawer, surface }: Props) => {
  const textColor = SurfaceStyleMap.get(surface)

  return (
    <>
      <h3 className={`${textColor} px-4 pt-8 text-3xl font-bold`}>
        Somewhere else?
      </h3>
      <ul className={`${textColor} flex shrink flex-col gap-2 p-4`}>
        <li
          className={`flex flex-row justify-start gap-2 pb-0.5 pl-2 text-xl hover:border-b-2 hover:pb-0 ${textColor}`}
        >
          <ArrowFatLineRight size={24} weight="fill" />
          <Link onClick={() => closeSideDrawer?.()} href="/">
            The Web Wizard
          </Link>
        </li>
        <li
          className={`flex flex-row justify-start gap-2 pb-0.5 pl-2 text-xl hover:border-b-2 hover:pb-0 ${textColor}`}
        >
          <ArrowFatLineRight size={24} weight="fill" />
          <Link onClick={() => closeSideDrawer?.()} href="/thoughts">
            Thoughts I Have
          </Link>
        </li>
      </ul>
    </>
  )
}
