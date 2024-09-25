import { Info } from './components/info'
import { Main } from './components/main'

export default async function Home() {
  return (
    <div className="mx-auto px-4 pt-4 pb-12 xl:max-w-7xl md:max-w-5xl mt-6 grid xl:grid-cols-balanced-wide gap-x-6">
      <div className="order-none">
        <Main />
      </div>
      <aside className="-order-1">
        <Info />
      </aside>
      <aside className="order-1">right</aside>
    </div>
  )
}
