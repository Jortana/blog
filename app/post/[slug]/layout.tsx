import MainLayout from '@/app/components/main-layout'
import { PostList } from '@/app/components/post-list'
import { getPost, getPosts } from '@/lib/contentplayerUtils'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: { slug: string }
}

export default function PostLayout({
  children,
  params,
}: React.PropsWithChildren<PostPageProps>) {
  const { slug } = params
  const post = getPost(slug)
  if (!post) {
    notFound()
  }

  const { posts } = getPosts()

  return <MainLayout left={<PostList currentId={post._id} />} main={children} />
}
