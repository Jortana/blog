import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@app/components/header'
import type { Metadata } from 'next'
import { memo } from 'react'
import { Info } from './components/info'

export const metadata: Metadata = {
  // 整个站点共用的 metadata
  // viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  formatDetection: {
    telephone: false,
  },
  // 默认 title，在 shallow merge 时可被覆盖
  title: "Rory's blog",
}

const LeftHolder = memo(() => (
  <div className="block col-start-1 col-end-1 -order-1 w-0 min-w-0 h-0 max-h-0" />
))

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="zh-Hans-CN" suppressHydrationWarning>
      <body className="bg-slate-100 dark:bg-zinc-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="mx-auto px-4 pt-4 pb-12 xl:max-w-7xl md:max-w-5xl mt-6 grid xl:grid-cols-balanced-wide gap-x-6 md:grid-cols-narrow-wide">
            <div className="order-none">{children}</div>
            <aside className="-order-1">
              <div className="sticky top-6">
                <Info />
              </div>
            </aside>
            <aside className="order-1 hidden xl:block" />
          </div>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
