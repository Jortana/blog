import React from 'react'
import { ImageZoom } from './image'

export function ParagraphWithoutImage({ children }: React.PropsWithChildren) {
  if (!children) {
    return null
  }

  // 如果段落只包含图片，则直接返回子元素，避免 <p> 包裹 <div>
  const childArray = React.Children.toArray(children)
  if (
    childArray.length === 1 &&
    React.isValidElement(childArray[0]) &&
    childArray[0].type === ImageZoom
  ) {
    return <>{children}</>
  }

  return <p>{children}</p>
}
