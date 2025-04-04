import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: '// DJK',
  description: 'Daniel John Keefer - Professional Web Wizard',
}

const monaSans = localFont({
  src: '../fonts/Mona-Sans.woff2',
  variable: '--font-mona-sans',
  fallback: ['sans-serif'],
})
const jetBrainsMono = localFont({
  src: '../fonts/JetBrainsMono-VariableFont_wght.ttf',
  variable: '--font-jetbrains',
  fallback: ['sans-serif'],
})
const shantellSans = localFont({
  src: '../fonts/ShantellSans-VariableFont_BNCE,INFM,SPAC,wght.ttf',
  variable: '--font-shantell-sans',
  fallback: ['sans-serif'],
})
const notoColorEmoji = localFont({
  src: '../fonts/NotoColorEmoji-Regular.ttf',
  variable: '--font-noto-emoji',
  weight: '100 900',
  style: 'normal',
  fallback: ['sans-serif'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${jetBrainsMono.variable} ${shantellSans.variable} ${notoColorEmoji.variable}`}
    >
      <body className="scroll-smooth antialiased">{children}</body>
    </html>
  )
}
