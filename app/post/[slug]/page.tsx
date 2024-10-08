import { TagList } from '@/app/components/tag-list'
import { Card, CardContent } from '@/components/ui/card'
import { getPost } from '@/lib/contentplayerUtils'
import { cn } from '@/lib/tailwindUtils'
import dayjs from 'dayjs'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
        <div className="text-primary/50">
          {dayjs(date).format('YYYY-MM-DD')}
        </div>
        {/* 文章内容 */}
        <article
          className={cn(
            'prose prose-slate dark:prose-invert max-w-none',
            'prose-pre:max-w-[37rem]',
            'prose-a:transition-opacity hover:prose-a:opacity-75 dark:hover:prose-a:opacity-85',
          )}
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
        <TagList tags={tags} />
      </CardContent>
    </Card>
  )
}
