import { Pagination } from '@/app/components/pagination'
import { PostCard } from '@/app/components/post-card'
import { PAGESIZE, getPosts, getTotalPostCount } from '@/lib/contentplayerUtils'

type PostPageProps = {
  params: { pageIndex: string }
}

export const generateMetadata = async ({ params }: PostPageProps) => {
  const { pageIndex } = params

  return {
    title: `文章列表: 第 ${pageIndex} 页 | Rory's Blog`,
  }
}

export default function Page({ params }: PostPageProps) {
  const { pageIndex } = params
  const { totalPages, page, posts } = getPosts(Number.parseInt(pageIndex, 10))

  return (
    <>
      <div className="space-y-6 mb-6">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} isFirst={index === 0} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  )
}

export function generateStaticParams() {
  const totalPostCount = getTotalPostCount()
  const pages = Math.ceil(totalPostCount / PAGESIZE)
  return Array.from({ length: pages }, (_, index) => ({
    pageIndex: (index + 1).toString(),
  }))
}
