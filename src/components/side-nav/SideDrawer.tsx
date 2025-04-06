import {
  Butterfly,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr'

import { SideNavLinks } from './SideNavLinks'
type SideDrawerProps = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}
export const SideDrawer = ({
  drawerOpen,
  scrollRef,
  setDrawerOpen,
}: SideDrawerProps) => {
  return (
    <aside className="drawer-side">
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></button>
      <nav className="bg-base-300 text-base-content flex h-screen w-80 flex-col">
        <h2 className="p-4 text-6xl font-black [writing-mode:sideways-lr]">
          DJK_
        </h2>
        <SideNavLinks
          surface="bg-base-300"
          scrollRef={scrollRef}
          closeSideDrawer={() => setDrawerOpen(!drawerOpen)}
        />
        <ul className="flex justify-around gap-4 p-4">
          <li className="tooltip" data-tip="Github">
            <a
              href="https://github.com/xxKeefer"
              target="_blank"
              className="btn btn-square btn-neutral"
            >
              <GithubLogo size={24} weight="fill" />
            </a>
          </li>
          <li className="tooltip" data-tip="LinkedIn">
            <a
              href="https://www.linkedin.com/in/xxkeefer/"
              target="_blank"
              className="btn btn-square btn-neutral"
            >
              <LinkedinLogo size={28} weight="fill" />
            </a>
          </li>
          <li className="tooltip" data-tip="Bluesky">
            <a
              href="https://bsky.app/profile/xxkeefer.bsky.social"
              target="_blank"
              className="btn btn-square btn-neutral"
            >
              <Butterfly size={28} weight="fill" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
