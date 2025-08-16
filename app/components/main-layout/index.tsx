import { cn } from '@/lib/tailwindUtils'

type MainLayoutProps = {
  left?: React.ReactNode
  main: React.ReactNode
  right?: React.ReactNode
}

export default function MainLayout({ left, main, right }: MainLayoutProps) {
  return (
    <>
      <div
        className={cn(
          'mx-auto px-4 pt-4 pb-10 xl:max-w-7xl md:max-w-5xl',
          'md:grid md:gap-x-3 md:grid-cols-narrow-wide',
          'xl:grid-cols-balanced-wide',
        )}
      >
        <div className="order-none overflow-y-auto">{main}</div>

        <aside className="-order-1">
          <div className="sticky top-6 h-[calc(100vh-3.5rem)] overflow-y-auto">
            {left}
          </div>
        </aside>

        <aside className="order-1 hidden xl:block">{right}</aside>
      </div>
    </>
  )
}
