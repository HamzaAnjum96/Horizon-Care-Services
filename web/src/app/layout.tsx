import type { Metadata } from 'next'
import { Source_Serif_4, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-source-serif',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Horizon Care Services',
  description:
    'Health and social care provider offering supported accommodation, staffing solutions, and home care across England.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${bricolage.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <div className="grain-overlay" aria-hidden="true" />
        <div
          role="status"
          className="fixed bottom-0 left-0 right-0 z-30 bg-ink-dark/95 backdrop-blur-sm border-t border-rule-dark py-1.5 px-4 text-center pointer-events-none"
        >
          <p className="text-[10px] font-medium text-ink-muted-light tracking-[0.1em] uppercase">
            Development preview — content is not final and may contain placeholders
          </p>
        </div>
        {children}
      </body>
    </html>
  )
}
