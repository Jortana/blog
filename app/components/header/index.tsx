import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './mode-toggle'

const navLinks: { title: string; href: string; description?: string }[] = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '归档',
    href: '/archives',
  },
  {
    title: '标签',
    href: '/tags',
  },
]

export function Header() {
  return (
    <nav className="xl:px-0 py-2 bg-background">
      <div className="mx-auto flex items-center xl:max-w-7xl md:max-w-5xl">
        <h1>
          <Button variant="ghost">
            <Link href="/">
              <span>Rory's Blog</span>
            </Link>
          </Button>
        </h1>
        <div className="mr-auto flex">
          <Navigation />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

function Navigation() {
  return (
    <>
      {navLinks.map((link) => (
        <Button variant="ghost" key={link.href}>
          <Link href={link.href}>{link.title}</Link>
        </Button>
      ))}
    </>
  )
}
