'use client'
import React from 'react'
import { Scroller } from '~/components/Scroller'
import Python from 'devicons-react/icons/PythonOriginal'
import Vite from 'devicons-react/icons/VitejsOriginal'
import Vitest from 'devicons-react/icons/VitestOriginal'
import ReactIcon from 'devicons-react/icons/ReactOriginal'
import Typescript from 'devicons-react/icons/TypescriptOriginal'
import Jest from 'devicons-react/icons/JestPlain'
import Nextjs from 'devicons-react/icons/NextjsOriginal'
import ReactRouter from 'devicons-react/icons/ReactrouterOriginal'
import Tailwind from 'devicons-react/icons/TailwindcssOriginal'
import Eslint from 'devicons-react/icons/EslintOriginal'
import Github from 'devicons-react/icons/GithubOriginal'
import Gitlab from 'devicons-react/icons/GitlabOriginal'
import { useDarkMode } from 'usehooks-ts'

export const SkillsSection = () => {
  const { isDarkMode } = useDarkMode()
  const bg = isDarkMode ? 'bg-base-content' : 'bg-white'
  return (
    <div
      className={`${bg} border-base-content hidden place-items-center border-y-4 md:block`}
    >
      <div className="max-w-full py-8 md:py-12 lg:py-16">
        <Scroller direction="left">
          <ReactIcon size={200} />
          <Vite size={200} />
          <Github size={200} />
          <Vitest size={200} />
          <Typescript size={200} />
          <Jest size={200} />
          <Nextjs size={200} />
          <ReactRouter size={200} />
          <Tailwind size={200} />
          <Eslint size={200} />
          <Gitlab size={200} />
          <Python size={200} />
        </Scroller>
      </div>
    </div>
  )
}
