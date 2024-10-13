import { ArticleWrapper } from '@/app/components/markdown-components/article-wrapper'
import { Code, CodeBlock } from '@/app/components/markdown-components/code'
import { ImageZoom } from '@/app/components/markdown-components/image'
import { ParagraphWithoutImage } from '@/app/components/markdown-components/paragraph'
import { TagList } from '@/app/components/tag-list'
import { Card, CardContent } from '@/components/ui/card'
import { getPost } from '@/lib/contentplayerUtils'
import dayjs from 'dayjs'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
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

  const { headerImage, date, tags, title, readingTime } = post

  return (
    <Card className="overflow-hidden">
      {headerImage && (
        <div className="relative w-full h-56">
          <Image className="object-cover" src={headerImage} alt={title} fill />
        </div>
      )}
      <CardContent className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="text-primary/50 space-x-2">
          <span>{dayjs(date).format('YYYY-MM-DD')}</span>
          <span>·</span>
          <span>{readingTime.text}</span>
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
              code: {
                component: Code,
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
