import { getPosts } from '@/lib/contentplayerUtils'
import { PostCard } from './components/post-card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'

export default async function Home() {
  const { posts, page } = getPosts()

  const totalPages = 10

  // 小于5页全部显示，多余5页只显示前两页和最后一页
  const beforePages = totalPages <= 5 ? totalPages : 2
  const afterPages = totalPages <= 5 ? 0 : totalPages

  return (
    <>
      <div className="space-y-6 mb-6">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <Pagination>
        <PaginationContent className="">
          <PaginationItem className="mr-5">
            <PaginationPrevious href="#">上一页</PaginationPrevious>
          </PaginationItem>
          {Array.from({ length: beforePages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#" isActive={index + 1 === page}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {!!afterPages && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem className="ml-5">
            <PaginationNext href="#">下一页</PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
