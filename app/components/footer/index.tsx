import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tailwindUtils'
import Link from 'next/link'

export function Footer() {
  return (
    <>
      <footer className="px-8 pt-12 pb-24 bg-background">
        <div
          className={cn(
            'text-primary/80 text-center',
            'md:flex md:justify-between',
          )}
        >
          <div>
            Copyright © 2021 - {new Date().getFullYear()}{' '}
            <Link
              className={cn(
                buttonVariants({ variant: 'link' }),
                'p-0 text-base ml-1 h-auto',
              )}
              href="/"
            >
              Rory's Blog
            </Link>
          </div>
          <div>
            Power by{' '}
            <Link
              className={cn(
                buttonVariants({ variant: 'link' }),
                'p-0 text-base h-auto',
              )}
              href="https://nextjs.org/"
            >
              Next.js
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
