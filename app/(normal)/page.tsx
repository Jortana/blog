import { getPosts } from '@/lib/contentplayerUtils'
import type { Metadata } from 'next'
import { Pagination } from '../components/pagination'
import { PostCard } from '../components/post-card'

export const metadata: Metadata = {
  title: "首页 | Rory's blog",
  description: 'Rory的个人博客，记录生活和技术。',
}

export default async function Home() {
  const { posts, page, totalPages } = getPosts()

  return (
    <>
      <div className="space-y-6 mb-6">
        {posts.map((post, index) => (
          <PostCard key={post._id} post={post} isFirst={index === 0} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  )
}
