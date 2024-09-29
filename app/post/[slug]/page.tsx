import { getPost } from '@/lib/contentplayerUtils'
import { notFound } from 'next/navigation'

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

  return (
    <>
      <div>{post.title}</div>
    </>
  )
}
