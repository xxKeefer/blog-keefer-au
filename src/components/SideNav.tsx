import React, { ReactNode } from 'react'
import Link from 'next/link'
import { type Section } from '~/hooks/sections'
import {
  ArrowFatLineRight,
  Butterfly,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
type Props = {
  children: ReactNode
  sections: Section[]
  active?: Section['id']
}

export const SideNav = ({ children, sections, active }: Props) => {
  return (
    <div className="flex h-svh gap-0">
      <aside className="bg-secondary w-full">
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
                <a href="https://github.com/xxKeefer" target="_blank">
                  <button className="btn btn-square btn-soft">
                    <GithubLogo size={24} weight="fill" />
                  </button>
                </a>
              </li>
              <li className="tooltip" data-tip="LinkedIn">
                <a href="https://www.linkedin.com/in/xxkeefer/" target="_blank">
                  <button className="btn btn-square btn-soft">
                    <LinkedinLogo size={28} weight="fill" />
                  </button>
                </a>
              </li>
              <li className="tooltip" data-tip="Bluesky">
                <a
                  href="https://bsky.app/profile/xxkeefer.bsky.social"
                  target="_blank"
                >
                  <button className="btn btn-square btn-soft">
                    <Butterfly size={28} weight="fill" />
                  </button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="max-w-[calc(100%-300px)] overflow-y-scroll">
        {children}
      </div>
    </div>
  )
}
