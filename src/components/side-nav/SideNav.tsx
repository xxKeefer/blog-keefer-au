'use client'
import React, { ReactNode, useState } from 'react'

import { MobileDock } from './MobileDock'
import { SideBar } from './SideBar'
import { SideDrawer } from './SideDrawer'
import { SideNavLink } from './SideNavLinks'
import { SidePanel } from './SidePanel'
type Props = {
  children: ReactNode
  links: SideNavLink[]
}

export const SideNav = ({ children, links }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <div className="drawer h-svh">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly
      />

      <div className="drawer-content flex h-svh gap-0">
        <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <SidePanel links={links} />
        <div className="max-w-full overflow-y-scroll pb-8 sm:max-w-[calc(100%-30px)] sm:pb-0 lg:max-w-[calc(100%-300px)] xl:w-full">
          {children}
        </div>
        <MobileDock drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </div>
      <SideDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        links={links}
      />
    </div>
  )
}
