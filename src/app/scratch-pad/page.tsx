import { StatusTableDemo } from '~/demos/gizmos/StatusTable/StatusTableDemo'

export default async function Page() {
  return (
    <div className="bg-base-200 flex min-h-screen w-full flex-col items-center justify-center">
      <div className="max-w-2xl">
        <StatusTableDemo />
      </div>
    </div>
  )
}
