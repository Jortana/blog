import './globals.css'
import { Header } from '@app/components/header'
import { ThemeProvider } from '@/components/theme-provider'

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
          <div className="mx-auto px-4 pt-4 pb-12 xl:max-w-7xl md:max-w-5xl mt-6">
            {children}
          </div>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
