import { Info } from '@/app/components/info'

export default function PostLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto px-4 pt-4 pb-12 xl:max-w-7xl md:max-w-5xl mt-6 grid xl:grid-cols-balanced-wide gap-x-6 md:grid-cols-narrow-wide">
      <div className="order-none">{children}</div>
      <aside className="-order-1">
        <div className="sticky top-6">
          <Info />
        </div>
      </aside>
      <aside className="order-1 hidden xl:block" />
    </div>
  )
}
