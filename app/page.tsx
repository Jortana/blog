import { getPosts } from '@/lib/contentplayerUtils'
import { PostCard } from './components/post-card'
import { Pagination } from './components/pagination'

export default async function Home() {
  const { posts, page } = getPosts()

  const totalPages = page

  return (
    <>
      <div className="space-y-6 mb-6">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  )
}
