import type { Post } from '@/.contentlayer/generated'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      {post.headerImage && (
        <div className="relative w-full h-56">
          <Link href={post.url}>
            <Image
              className="object-cover"
              src={post.headerImage}
              alt={post.title}
              fill
            />
          </Link>
        </div>
      )}
      <CardContent className="p-5 space-y-4">
        <article>
          <h2 className="text-2xl text-primary/85 hover:text-primary transition">
            <Link href={post.url}>{post.title}</Link>
          </h2>
        </article>
        <section className="text-primary/75">{post.excerpt}</section>
        <div className="space-x-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-primary/60 hover:text-primary/85 transition"
            >
              <Link href="#">#{tag}</Link>
            </span>
          ))}
        </div>
        <div className="flex justify-between text-primary/50">
          <div>
            <span>{dayjs(post.date).format('YYYY-MM-DD')}</span>
          </div>
          <div>
            <Link href={post.url}>
              <Button
                className="font-normal text-primary/80 hover:text-primary/95 transition"
                variant="link"
              >
                继续阅读
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
