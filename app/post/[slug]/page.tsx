import { Card, CardContent } from '@/components/ui/card'
import { getPost } from '@/lib/contentplayerUtils'
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

  const { headerImage, date } = post

  return (
    <Card>
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
      <CardContent className="p-6">
        <h1 className="text-2xl mb-4">{post.title}</h1>
        <div>{dayjs(date).format('YYYY-MM-DD')}</div>
        {/* 文章内容 */}
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </CardContent>
    </Card>
  )
}
