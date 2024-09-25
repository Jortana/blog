import './globals.css'
import { Header } from '@app/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { memo } from 'react'

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
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
