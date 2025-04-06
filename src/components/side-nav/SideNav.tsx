'use client'
import React, { ReactNode, useRef, useState } from 'react'

import { MobileDock } from './MobileDock'
import { SideBar } from './SideBar'
import { SideDrawer } from './SideDrawer'
import { SidePanel } from './SidePanel'
type Props = {
  children: ReactNode
}

export const SideNav = ({ children }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  return (
    <div className="drawer h-svh">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly
        aria-label="Drawer Toggle"
      />

      <div className="drawer-content flex h-svh gap-0">
        <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <SidePanel scrollRef={scrollRef} />
        <div
          ref={scrollRef}
          className="w-full overflow-y-auto pb-8 sm:max-w-[calc(100%-30px)] sm:pb-0 lg:max-w-[calc(100%-300px)] xl:w-full"
        >
          {children}
        </div>
        <MobileDock drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </div>
      <SideDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        scrollRef={scrollRef}
      />
    </div>
  )
}
