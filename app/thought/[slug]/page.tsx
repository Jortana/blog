import { mdxComponents } from '@/app/components/markdown-components/mdx-components'
import { getAllThoughtsInfo, getThought } from '@/lib/contentplayerUtils'
import { cn } from '@/lib/tailwindUtils'
import dayjs from 'dayjs'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

type ThoughtPageProps = {
  params: { slug: string }
}

export default function ThoughtPage({ params }: ThoughtPageProps) {
  const { slug } = params
  const thought = getThought(slug)

  if (!thought) {
    notFound()
  }

  const MDXContent = useMDXComponent(thought.body.code)

  return (
    <article className="p-4">
      <h2 className="text-xl font-bold mb-2">{thought.title}</h2>
      <div className="text-sm text-muted-foreground mb-2">
        <span>{dayjs(thought.date).format('YYYY-MM-DD')}</span>
        <span className="mx-1">·</span>
        <span>{thought.readingTime.text}</span>
      </div>
      <div
        className={cn(
          'prose prose-slate dark:prose-invert max-w-none',
          'prose-a:transition-opacity prose-a:underline-offset-2 hover:prose-a:opacity-75 dark:hover:prose-a:opacity-85',
        )}
      >
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  )
}

export function generateStaticParams() {
  const allThoughtSlugs = getAllThoughtsInfo(['slug'])
  return allThoughtSlugs.map((thought) => ({
    slug: thought.slug,
  }))
}
