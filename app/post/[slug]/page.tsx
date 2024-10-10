import { TagList } from '@/app/components/tag-list'
import { Card, CardContent } from '@/components/ui/card'
import { getPost } from '@/lib/contentplayerUtils'
import { cn } from '@/lib/tailwindUtils'
import dayjs from 'dayjs'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'
import React from 'react'

export const runtime = 'edge'

type PostPageProps = {
  params: { slug: string }
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const post = getPost(slug)

  if (!post) {
    // 重定向 404
    notFound()
  }

  const { headerImage, date, tags } = post

  return (
    <Card className="overflow-hidden">
      {headerImage && (
        <div className="relative w-full h-56">
          <Image
            className="object-cover"
            src={headerImage}
            alt={post.title}
            fill
          />
        </div>
      )}
      <CardContent className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="text-primary/50 space-x-2">
          <span>{dayjs(date).format('YYYY-MM-DD')}</span>
          <span>·</span>
          <span>{post.readingTime.text}</span>
        </div>
        {/* 文章内容 */}
        <Markdown
          options={{
            wrapper: ArticleWrapper,
            forceWrapper: true,
            overrides: {
              p: {
                component: ParagraphWithoutImage,
              },
              img: {
                component: ImageZoom,
              },
            },
          }}
        >
          {post.body.html}
        </Markdown>
        <TagList tags={tags} />
      </CardContent>
    </Card>
  )
}

function ArticleWrapper({ children }: React.PropsWithChildren) {
  return (
    <div
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none',
        'prose-pre:max-w-[37rem]',
        'prose-a:transition-opacity hover:prose-a:opacity-75 dark:hover:prose-a:opacity-85',
      )}
    >
      {children}
    </div>
  )
}

function ParagraphWithoutImage({ children }: React.PropsWithChildren) {
  if (!children) {
    return null
  }

  // 如果段落只包含图片，则直接返回子元素，避免 <p> 包裹 <div>
  const childArray = React.Children.toArray(children)
  if (
    childArray.length === 1 &&
    React.isValidElement(childArray[0]) &&
    childArray[0].type === ImageZoom
  ) {
    return <>{children}</>
  }

  return <p>{children}</p>
}

function ImageZoom({ src, alt }: { src: string; alt: string }) {
  return (
    <Zoom>
      <img src={src} alt={alt} />
    </Zoom>
  )
}
