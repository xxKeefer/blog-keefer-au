import {
  Butterfly,
  GithubLogo,
  LinkedinLogo,
  List,
} from '@phosphor-icons/react/dist/ssr'

type MobileDockProps = {
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}
export const MobileDock = ({ drawerOpen, setDrawerOpen }: MobileDockProps) => {
  return (
    <div className="dock bg-secondary text-secondary-content sm:hidden">
      <h2 className="text-4xl font-black">DJK_</h2>

      <div>
        <a
          href="https://github.com/xxKeefer"
          target="_blank"
          className="btn btn-square btn-soft tooltip tooltip-top"
          data-tip="Github"
          aria-label="Github"
        >
          <GithubLogo size={24} weight="fill" />
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/xxkeefer/"
          target="_blank"
          className="btn btn-square btn-soft tooltip tooltip-top"
          data-tip="LinkedIn"
          aria-label="LinkedIn"
        >
          <LinkedinLogo size={28} weight="fill" />
        </a>
      </div>
      <div>
        <a
          href="https://bsky.app/profile/xxkeefer.bsky.social"
          target="_blank"
          className="btn btn-square btn-soft tooltip tooltip-top"
          data-tip="Bluesky"
          aria-label="Bluesky"
        >
          <Butterfly size={28} weight="fill" />
        </a>
      </div>
      <div>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="btn btn-square btn-soft drawer-button tooltip tooltip-top"
          data-tip="Menu"
        >
          <List size={28} weight="bold">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 2 -2; -2 2; 2 -2; -2 2; 0 0"
              dur="0.2s"
              repeatCount="1"
              begin="0s;5s;15s;60s"
            />
          </List>
        </button>
      </div>
    </div>
  )
}
