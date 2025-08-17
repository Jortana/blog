import type { MDXComponents } from 'mdx/types'
import { Anchor } from './anchor'
import { Code } from './code'
import { ImageZoom } from './image'
import { ParagraphWithoutImage } from './paragraph'

export const mdxComponents: MDXComponents = {
  p: ParagraphWithoutImage,
  a: Anchor,
  img: ImageZoom,
  code: ({ children, className }) => {
    return <Code className={className}>{children}</Code>
  },
}
