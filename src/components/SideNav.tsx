import React, { ReactNode } from 'react'
import Link from 'next/link'
import { type Section } from '~/hooks/sections'
import {
  ArrowFatLineRight,
  Butterfly,
  GithubLogo,
  LinkedinLogo,
  List,
} from '@phosphor-icons/react'
type Props = {
  children: ReactNode
  sections: Section[]
  active?: Section['id']
}

export const SideNav = ({ children, sections, active }: Props) => {
  return (
    <div className="drawer h-svh">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex h-svh gap-0">
        <aside className="bg-secondary hidden w-min sm:block lg:hidden">
          <div className="flex h-full w-full flex-col items-center justify-start gap-2 p-2">
            <h2 className="text-secondary-content p-2 text-6xl font-black [writing-mode:sideways-lr]">
              DJK_
            </h2>
            <label
              role="button"
              htmlFor="my-drawer"
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
            </label>
            <ul className="mt-auto flex flex-col justify-around gap-4">
              <li className="tooltip tooltip-right" data-tip="Github">
                <a
                  href="https://github.com/xxKeefer"
                  target="_blank"
                  className="btn btn-square btn-soft btn-xl"
                >
                  <GithubLogo size={24} weight="fill" />
                </a>
              </li>
              <li className="tooltip tooltip-right" data-tip="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/xxkeefer/"
                  target="_blank"
                  className="btn btn-square btn-soft btn-xl"
                >
                  <LinkedinLogo size={28} weight="fill" />
                </a>
              </li>
              <li className="tooltip tooltip-right" data-tip="Bluesky">
                <a
                  href="https://bsky.app/profile/xxkeefer.bsky.social"
                  target="_blank"
                  className="btn btn-square btn-soft btn-xl"
                >
                  <Butterfly size={28} weight="fill" />
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <aside className="bg-secondary hidden w-full lg:block">
          <div className="flex h-full w-full flex-col gap-8 p-4">
            <h2 className="text-secondary-content p-2 text-6xl font-black">
              DJK_
            </h2>

            <nav className="flex h-full flex-col gap-4">
              <h3 className="text-secondary-content text-3xl font-bold">
                On this Page
              </h3>
              <ul className="flex flex-col gap-2">
                {sections.map((s) => (
                  <li
                    key={s.id}
                    className={`btn text-xl ${s.id === active ? 'btn-soft justify-center font-bold' : 'btn-ghost text-secondary-content hover:text-base-content justify-start'}`}
                  >
                    <Link href={`#${s.id}`}>
                      <span className="flex items-center gap-2">
                        <ArrowFatLineRight size={24} weight="fill" />
                        {s.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
            </nav>
          </div>
        </aside>
        <div className="max-w-full overflow-y-scroll sm:max-w-[calc(100%-30px)] lg:max-w-[calc(100%-300px)]">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="menu bg-base-300 text-base-content h-full w-80 p-2">
          <div className="flex h-full w-full flex-col gap-8 p-4">
            <h2 className="p-2 text-6xl font-black [writing-mode:sideways-lr]">
              DJK_
            </h2>

            <nav className="flex h-full flex-col gap-4">
              <h3 className="text-3xl font-bold">On this Page</h3>
              <ul className="flex flex-col gap-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className={`btn text-xl ${s.id === active ? 'btn-neutral justify-center font-bold' : 'btn-ghost justify-start'}`}
                    >
                      <span className="flex items-center gap-2">
                        <ArrowFatLineRight size={24} weight="fill" />
                        {s.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
