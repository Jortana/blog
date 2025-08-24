'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/tailwindUtils'
import Link from 'next/link'
import { useActiveSection } from '@/hooks/useActiveSection'

type TocItem = {
  depth: number
  value: string
  slug: string
}

type TableOfContentsProps = {
  toc: TocItem[]
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const searchToc = [{ depth: 1, value: '', slug: 'h1' }, ...toc]
  const activeId = useActiveSection(searchToc, {
    topLine: 0.2,
    depths: [2, 3, 4, 5, 6],
  })

  return (
    <Card className="md:sticky md:top-6">
      <CardHeader className="pb-2">
        <div className="text-lg font-bold">文章目录</div>
      </CardHeader>
      <CardContent>
        <ul>
          {toc.map((item) => (
            <li key={item.slug}>
              <Button
                variant="link"
                className={cn(
                  'p-0',
                  'hover:no-underline',
                  'text-primary/70 hover:text-primary',
                  'text-sm',
                  activeId === item.slug && 'text-primary',
                )}
                style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}
                size="sm"
                asChild
              >
                <Link href={`#${item.slug}`}>{item.value}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
