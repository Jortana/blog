import Link from 'next/link'

type TagListProps = {
  tags: string[]
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="space-x-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-primary/60 hover:text-primary/85 transition"
        >
          <Link href={`tag/${tag}`}>#{tag}</Link>
        </span>
      ))}
    </div>
  )
}
