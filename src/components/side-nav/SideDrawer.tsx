import {
  Butterfly,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr'
import { SideNavLink, SideNavLinks } from './SideNavLinks'
type SideDrawerProps = {
  links: SideNavLink[]
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}
export const SideDrawer = ({
  drawerOpen,
  links,
  setDrawerOpen,
}: SideDrawerProps) => {
  return (
    <div className="drawer-side">
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></button>
      <aside className="menu bg-base-300 text-base-content h-full w-80 p-2">
        <div className="flex h-full w-full flex-col gap-8 px-4">
          <h2 className="p-2 text-6xl font-black [writing-mode:sideways-lr]">
            DJK_
          </h2>

          <div className="flex h-full flex-col gap-4">
            <SideNavLinks
              links={links}
              closeSideDrawer={() => setDrawerOpen(!drawerOpen)}
            />
            <ul className="mt-auto flex justify-around gap-4">
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
          </div>
        </div>
      </aside>
    </div>
  )
}
