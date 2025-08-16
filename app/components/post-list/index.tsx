'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/tailwindUtils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getAllPostsInfo, getAllThoughtsInfo } from '@/lib/contentplayerUtils'

function getInfosByPathname(pathname: string) {
  // 处理文章相关路径：/posts, /post/*, /posts/*
  if (
    pathname === '/posts' ||
    pathname.startsWith('/post/') ||
    pathname.startsWith('/posts/')
  ) {
    return { infos: getAllPostsInfo(), title: '所有文章' }
  }

  // 处理思考相关路径：/thoughts, /thoughts/*
  if (pathname === '/thoughts' || pathname.startsWith('/thoughts/')) {
    return { infos: getAllThoughtsInfo(), title: '所有碎碎念' }
  }

  return { infos: [], title: '' }
}

export function PostList({
  currentId,
}: {
  currentId?: string
}) {
  // 根据不同路由，拿不同的数据
  const pathname = usePathname()
  const { infos, title } = getInfosByPathname(pathname)

  return (
    <>
      {!!title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
      <div>
        {infos.map((info) => (
          <Link href={info.url} key={info._id}>
            <Button
              variant="link"
              className={cn(
                'p-0',
                'hover:no-underline',
                'text-primary/70 hover:text-primary',
                currentId === info._id && 'text-primary',
                !currentId && 'text-primary/80 hover:text-primary',
              )}
            >
              {info.title}
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}
