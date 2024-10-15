import { Code } from '@/app/components/markdown-components/code'
import { ImageZoom } from '@/app/components/markdown-components/image'
import { ParagraphWithoutImage } from '@/app/components/markdown-components/paragraph'
import { TagList } from '@/app/components/tag-list'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPostSlugs, getPost } from '@/lib/contentplayerUtils'
import { cn } from '@/lib/tailwindUtils'
import dayjs from 'dayjs'
import { ChevronUp } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: { slug: string }
}

const mdxComponents: MDXComponents = {
  p: ParagraphWithoutImage,
  img: ImageZoom,
  code: ({ children, className }) => {
    return <Code className={className}>{children}</Code>
  },
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  const { headerImage, date, tags, title, readingTime } = post

  const MDXContent = useMDXComponent(post.body.code)

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
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-primary/50 space-x-2">
            <span>{dayjs(date).format('YYYY-MM-DD')}</span>
            <span>·</span>
            <span>{readingTime.text}</span>
          </div>
          {/* 文章内容 */}
          <article
            className={cn(
              'prose prose-slate dark:prose-invert max-w-none',
              'prose-a:transition-opacity hover:prose-a:opacity-75 dark:hover:prose-a:opacity-85',
            )}
          >
            <MDXContent components={mdxComponents} />
          </article>
          {/* Tag */}
          <TagList tags={tags} />
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
          <ChevronUp />
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
