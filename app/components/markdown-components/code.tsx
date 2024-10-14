'use client'

import hljs from 'highlight.js'
import type React from 'react'
import { useEffect, useRef } from 'react'

export function Code(props: React.PropsWithChildren<{ className?: string }>) {
  const { children } = props
  if (props.className?.startsWith('language-')) {
    // 如果是块级代码，渲染为高亮代码块
    return <CodeBlock className={props.className}>{children}</CodeBlock>
  }
  // 否则为行内代码
  return <InlineCode>{children}</InlineCode>
}

export function CodeBlock({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    codeRef.current && hljs.highlightElement(codeRef.current)
  }, [])

  return (
    <code ref={codeRef} className={className}>
      {children}
    </code>
  )
}

export function InlineCode({ children }: React.PropsWithChildren) {
  return <code>{children}</code>
}
