import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shahad Kurungadan | Embedded Systems Engineer',
  description: 'Embedded Systems Engineer with expertise in C/C++, systems programming, and hardware-software interfacing',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
