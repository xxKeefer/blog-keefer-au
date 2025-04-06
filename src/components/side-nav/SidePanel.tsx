import { Butterfly, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

import { SideAnchorLinks } from './SideAnchorLinks'
import { SideNavLinks } from './SideNavLinks'

type Props = {
  scrollRef: React.RefObject<HTMLDivElement | null>
}
export const SidePanel = ({ scrollRef }: Props) => {
  return (
    <aside className="bg-secondary hidden w-full max-w-80 lg:block">
      <nav className="flex h-screen w-80 flex-col">
        <h2 className="text-secondary-content p-4 text-6xl font-black [writing-mode:sideways-lr]">
          DJK_
        </h2>
        <SideNavLinks surface="bg-secondary" />
        <SideAnchorLinks scrollRef={scrollRef} surface="bg-secondary" />
        <ul className="mt-auto flex justify-around gap-4 p-4">
          <li className="tooltip" data-tip="Github">
            <a
              href="https://github.com/xxKeefer"
              target="_blank"
              className="btn btn-square btn-soft"
              aria-label="Github"
            >
              <GithubLogo size={24} weight="fill" />
            </a>
          </li>
          <li className="tooltip" data-tip="LinkedIn">
            <a
              href="https://www.linkedin.com/in/xxkeefer/"
              target="_blank"
              className="btn btn-square btn-soft"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={28} weight="fill" />
            </a>
          </li>
          <li className="tooltip" data-tip="Bluesky">
            <a
              href="https://bsky.app/profile/xxkeefer.bsky.social"
              target="_blank"
              className="btn btn-square btn-soft"
              aria-label="Bluesky"
            >
              <Butterfly size={28} weight="fill" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
