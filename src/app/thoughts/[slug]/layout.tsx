import { SideNav } from '~/components/side-nav'

export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SideNav links={[]}>{children}</SideNav>
}
