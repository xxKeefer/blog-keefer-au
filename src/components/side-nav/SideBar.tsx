import {
  Butterfly,
  GithubLogo,
  LinkedinLogo,
  List,
} from '@phosphor-icons/react/dist/ssr'

type Props = {
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}
export const SideBar = ({ drawerOpen, setDrawerOpen }: Props) => {
  return (
    <aside className="bg-secondary hidden w-min sm:block lg:hidden">
      <div className="flex h-full w-full flex-col items-center justify-start gap-2 p-2">
        <h2 className="text-secondary-content p-2 text-6xl font-black [writing-mode:sideways-lr]">
          DJK_
        </h2>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="btn btn-square btn-soft drawer-button btn-xl tooltip tooltip-bottom -ml-1"
          data-tip="Menu"
        >
          <List size={32} weight="bold">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 2 -2; -2 2; 2 -2; -2 2; 0 0"
              dur="0.2s"
              repeatCount="1"
              begin="0s; 15s"
            />
          </List>
        </button>
        <ul className="mt-auto flex flex-col justify-around gap-4">
          <li className="tooltip tooltip-right" data-tip="Github">
            <a
              href="https://github.com/xxKeefer"
              target="_blank"
              className="btn btn-square btn-soft btn-xl"
              aria-label="Github"
            >
              <GithubLogo size={24} weight="fill" />
            </a>
          </li>
          <li className="tooltip tooltip-right" data-tip="LinkedIn">
            <a
              href="https://www.linkedin.com/in/xxkeefer/"
              target="_blank"
              className="btn btn-square btn-soft btn-xl"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={28} weight="fill" />
            </a>
          </li>
          <li className="tooltip tooltip-right" data-tip="Bluesky">
            <a
              href="https://bsky.app/profile/xxkeefer.bsky.social"
              target="_blank"
              className="btn btn-square btn-soft btn-xl"
              aria-label="Bluesky"
            >
              <Butterfly size={28} weight="fill" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
