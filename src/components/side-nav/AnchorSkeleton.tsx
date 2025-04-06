import React from 'react'

export const AnchorSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 p-4 pt-8 opacity-50">
      <div className="skeleton mb-4 h-10 w-52"></div>
      <div className="flex flex-row justify-start gap-2 pl-2">
        <div className="skeleton h-[24px] w-[24px]"></div>
        <div className="skeleton h-6 w-52"></div>
      </div>
      <div className="flex flex-row justify-start gap-2 pl-2">
        <div className="skeleton h-[24px] w-[24px]"></div>
        <div className="skeleton h-12 w-60"></div>
      </div>
      <div className="flex flex-row justify-start gap-2 pl-4">
        <div className="skeleton h-[24px] w-[24px]"></div>
        <div className="skeleton h-6 w-40"></div>
      </div>
      <div className="flex flex-row justify-start gap-2 pl-6">
        <div className="skeleton h-[24px] w-[24px]"></div>
        <div className="skeleton h-6 w-60"></div>
      </div>
      <div className="flex flex-row justify-start gap-2 pl-2">
        <div className="skeleton h-[24px] w-[24px]"></div>
        <div className="skeleton h-6 w-40"></div>
      </div>
    </div>
  )
}
