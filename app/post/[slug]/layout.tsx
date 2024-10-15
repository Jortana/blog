import { Info } from '@/app/components/info'
import { cn } from '@/lib/tailwindUtils'

export default function PostLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className={cn(
        'mx-auto px-4 pt-4 pb-12 xl:max-w-7xl md:max-w-5xl mt-6 space-y-4',
        'md:grid md:gap-x-6 md:grid-cols-narrow-wide md:space-y-0',
        'xl:grid-cols-balanced-wide',
      )}
    >
      <div className="order-none overflow-hidden">{children}</div>
      <aside className="-order-1">
        <div className="sticky top-6">
          <Info />
        </div>
      </aside>
      <aside className="order-1 hidden xl:block" />
    </div>
  )
}
