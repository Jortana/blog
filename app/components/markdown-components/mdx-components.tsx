import type { MDXComponents } from 'mdx/types'
import { Anchor } from './anchor'
import { Code, Pre } from './code'
import { ImageZoom } from './image'
import { ParagraphWithoutImage } from './paragraph'

export const mdxComponents: MDXComponents = {
  p: ParagraphWithoutImage,
  a: Anchor,
  img: ImageZoom,
  pre: Pre,
  code: ({ children, className }) => {
    return <Code className={className}>{children}</Code>
  },
}
