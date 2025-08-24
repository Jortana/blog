import { BadgeList } from '@/app/components/badge-list'
import { mdxComponents } from '@/app/components/markdown-components/mdx-components'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPostSlugs, getPost } from '@/lib/contentplayerUtils'
import { getPostBadges } from '@/lib/postUtils'
import { cn } from '@/lib/tailwindUtils'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: { slug: string }
}

export const generateMetadata = async ({ params }: PostPageProps) => {
  const { slug } = params
  const post = getPost(slug)

  return {
    title: `${post?.title} | Rory's Blog`,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  const { headerImage, date, tags, title, readingTime } = post

  const MDXContent = useMDXComponent(post.body.code)

  const badges = getPostBadges(post)

  return (
    <>
      <Card className="overflow-hidden">
        {headerImage && (
          <div className="relative w-full h-56">
            <Image
              className="object-cover"
              src={headerImage}
              alt={title}
              fill
            />
          </div>
        )}
        <CardContent className="p-6">
          <article className="space-y-4" id="content">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="text-primary/50 space-x-2">
              <span>{dayjs(date).format('YYYY-MM-DD')}</span>
              <span>·</span>
              <span>{readingTime.text}</span>
            </div>
            {/* 文章内容 */}
            <div
              className={cn(
                'prose prose-slate dark:prose-invert max-w-none',
                'prose-a:transition-opacity prose-a:underline-offset-2 hover:prose-a:opacity-75 dark:hover:prose-a:opacity-85',
              )}
            >
              <MDXContent components={mdxComponents} />
            </div>
            {/* Tag */}
            <BadgeList badges={badges} />
          </article>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 right-7 z-[100]">
        <Link
          className={cn(
            'flex items-center justify-center w-10 h-10 bg-secondary rounded shadow',
            'hover:text-sky-500 transition-colors',
          )}
          href="#"
        >
          <Icon icon="lucide:chevron-up" className="h-6 w-6" />
        </Link>
      </div>
    </>
  )
}

export function generateStaticParams() {
  const allPostSlugs = getAllPostSlugs()
  return allPostSlugs.map((slug) => ({
    slug,
  }))
}
