'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { SideNav, SideNavLink } from '~/components/side-nav'
import { Event } from '~/components/timeline/Event'
import { Timeline } from '~/components/timeline/Timeline'
const SkillsSection = dynamic(() => import('~/components/SkillsSection'), {
  ssr: false,
})

const links = [
  { id: 'hi-there', label: 'Hello!' },
  { id: 'about-me', label: 'A little about me' },
  { id: 'timeline', label: 'The Timeline' },
  { id: 'web-wizard', label: 'The Web Wizard' },
] as const satisfies SideNavLink[]

export default function Home() {
  return (
    <SideNav links={links}>
      <main className="flex flex-col justify-center scroll-smooth">
        <section id={links[0].id} className="bg-base-200 place-items-center">
          <div className="hero max-w-2xl pt-16 pb-8 md:pt-32 md:pb-20">
            <div className="hero-content text-center">
              <div className="max-w-2xl">
                <p className="mb-4 text-2xl font-bold md:text-4xl xl:text-6xl">
                  <span className="font-emoji animate-hand-wave inline-block">
                    👋
                  </span>
                  Hello there! I&apos;m
                </p>
                <h1 className="mb-8 text-6xl font-bold md:text-8xl">
                  Daniel John Keefer
                </h1>
                <p className="font-display mt-8 mb-12 text-3xl leading-relaxed md:text-5xl">
                  I turn problems <span className="font-emoji">🤯</span> into
                  magic <span className="font-emoji">🌟</span> using computers.
                </p>
                <p className="flex flex-col items-center gap-4 text-xl md:text-3xl">
                  <span className="flex items-center justify-start gap-4">
                    <span className="font-emoji">🧙‍♂️</span>Professional Web
                    Wizard
                  </span>
                  <span className="flex items-center justify-start gap-4">
                    <span className="font-emoji">💻</span>Enthusiastic Tech
                    Utopian
                  </span>
                  <span className="flex items-center justify-start gap-4">
                    <span className="font-emoji">✨</span>Husband, Father and
                    Friend
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* ----------------------- */}
        <section
          id={links[1].id}
          className="bg-base-100 w-full place-items-center"
        >
          <div className="xl:prose-2xl md:prose-xl prose px-8 py-8 sm:px-16 md:px-24 md:py-12 lg:px-32 lg:py-20 xl:max-w-7xl">
            <h2>
              <span className="font-emoji">🧔</span> {links[1].label}
            </h2>
            <p>
              I love tech. They say any sufficiently advanced tech is like magic
              to the uninitiated, and who doesn&apos;t want to be a Wizard? I
              love to use React and Typescript to turn problems into magic on
              the internet. Outside of tech, I have been married to my
              highschool sweetheart for {yearsSince('09-11-2013')} years and
              have two wonderful daughters. I love to cook as a bit of a zen
              activity to avoid burnout, my pickled onions are to die for.
              What&apos;s left of my free time get spent telling stories with
              friends through role playing games. Currently I enjoy helping one
              of my best friends to develop a rules system for telling stories
              called Omen.
            </p>
          </div>
        </section>
        {/* ----------------------- */}
        <SkillsSection />
        {/* ----------------------- */}
        <section id={links[2].id} className="bg-base-300 place-items-center">
          <div className="xl:prose-2xl md:prose-xl prose px-8 py-8 sm:px-16 md:px-24 md:py-12 lg:px-32 lg:py-20 xl:max-w-7xl">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl xl:mb-12 xl:text-6xl">
              <span className="font-emoji">🚀</span> {links[2].label}
            </h2>
            <Timeline>
              <Event
                marker="🎓"
                color="primary"
                side="left"
                time="Feb 2021"
                title="Finish Studying"
              >
                After a year of bustin&apos; hump, working part time, studying
                part time and juggling friends and family. I had finished my
                boot camp at Coder Academy and I was ready to take my new skills
                and kill it in Tech.
              </Event>
              <Event
                marker="🍊"
                color="secondary"
                side="right"
                time="Mar 2021"
                title="My First Gig"
              >
                I finally arrived in the Tech world! I got my first real
                industry position at Orange Digital. An agency full of wonderful
                people and amazing ideas about how work culture should be. I
                can&apos;t thank the friends I made there during my time at
                Orange enough. Love you guys!
              </Event>
              <Event
                marker="💉"
                color="accent"
                side="left"
                time="Nov 2021"
                title="Making a Difference"
              >
                I made the decision to take on bigger challenges at VaxApp. It
                was a tough decision at the time but it has paid off. I loved
                the feeling of doing something important by streamlining
                vaccination processes during the height of the pandemic. I get
                to help a lot of people with my dev skills whilst learning a lot
                in a fast paced start up.
              </Event>
              <Event
                marker="🦵"
                color="primary"
                side="right"
                time="Jan 2022"
                title="Breaking Bad"
              >
                My wife broke her leg! And we have stairs in our house. She and
                my daughters had to move into the in laws home while I took care
                of the pets at home. It was five long months of missing my
                family and I am very grateful to my in laws for looking after
                them during that time.
              </Event>
              <Event
                marker="🚦"
                color="secondary"
                side="left"
                time="Oct 2023"
                title="In the Fast Lane"
              >
                I left Vitavo{' '}
                <span className="italic">(formerly known as VaxApp)</span> to
                move into doing some enterprise software with a company called
                Transmax. It&apos;s the biggest engineering team I have ever
                worked with and I have learned a lot already about enterprise
                software, working across teams and more robust architectures.
                I&apos;m having a blast participating in communities of practice
                and making motorways that much smarter.
              </Event>
              <Event
                marker="🧑‍💻"
                color="accent"
                side="right"
                time="Today"
                title="Crushin' it Daily"
              >
                I am really enjoying my time at Transmax. I&apos;m getting to
                solve some worthwhile problems, champion best practices, and
                mentor the juniors on my team. I find myself getting a deeper
                understand of frontend fundamentals and at the same time
                learning about other spheres from my colleagues. Things like
                backend, AIT and DevOps to name a few fields.
              </Event>
              <Event
                marker="🔮"
                color="primary"
                side="left"
                time="Tomorrow?"
                title="Who knows?"
              >
                Maybe you and I could get to work together? You should find the
                time to reach out and say hi!
              </Event>
            </Timeline>
          </div>
        </section>

        <section
          id={links[3].id}
          className="hero bg-base-200 pt-16 pb-8 md:pb-20"
        >
          <div className="hero-content flex-col gap-8 lg:gap-16 xl:flex-row">
            <Image
              alt="Daniel John Keefer"
              src="/hero.jpg"
              width={761}
              height={1014}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div className="max-w-2xl text-center">
              <h1 className="mb-4 text-5xl font-bold md:text-6xl">
                Daniel John Keefer
              </h1>
              <p className="font-display mt-2 mb-8 text-xl leading-relaxed md:text-4xl xl:text-6xl">
                I turn problems <span className="font-emoji">🤯</span> into
                magic <span className="font-emoji">🌟</span> using computers.
              </p>
              <p className="flex flex-col items-center gap-4 text-xl md:text-2xl">
                <span className="flex items-center justify-start gap-4">
                  <span className="font-emoji">🧙‍♂️</span>Professional Web Wizard
                </span>
                <span className="flex items-center justify-start gap-4">
                  <span className="font-emoji">💻</span>Enthusiastic Tech
                  Utopian
                </span>
                <span className="flex items-center justify-start gap-4">
                  <span className="font-emoji">✨</span>Husband, Father and
                  Friend
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </SideNav>
  )
}

function yearsSince(date: string) {
  const past = new Date(date)
  const now = new Date()
  return now.getFullYear() - past.getFullYear() - 1
}
