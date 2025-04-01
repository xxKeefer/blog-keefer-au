import { Butterfly, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { SideNavLink, SideNavLinks } from './SideNavLinks'

type Props = {
  links: SideNavLink[]
}
export const SidePanel = ({ links }: Props) => {
  return (
    <aside className="bg-secondary hidden w-full max-w-[300px] lg:block">
      <div className="flex h-full w-full flex-col gap-8 p-4">
        <h2 className="text-secondary-content p-2 text-6xl font-black">DJK_</h2>

        <div className="flex h-full flex-col gap-4">
          <SideNavLinks links={links} dark />
          <ul className="mt-auto flex justify-around gap-4">
            <li className="tooltip" data-tip="Github">
              <a
                href="https://github.com/xxKeefer"
                target="_blank"
                className="btn btn-square btn-soft"
              >
                <GithubLogo size={24} weight="fill" />
              </a>
            </li>
            <li className="tooltip" data-tip="LinkedIn">
              <a
                href="https://www.linkedin.com/in/xxkeefer/"
                target="_blank"
                className="btn btn-square btn-soft"
              >
                <LinkedinLogo size={28} weight="fill" />
              </a>
            </li>
            <li className="tooltip" data-tip="Bluesky">
              <a
                href="https://bsky.app/profile/xxkeefer.bsky.social"
                target="_blank"
                className="btn btn-square btn-soft"
              >
                <Butterfly size={28} weight="fill" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
