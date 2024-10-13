'use client'

import hljs from 'highlight.js'
import type React from 'react'
import { useEffect, useRef } from 'react'

export function Code(
  props: React.PropsWithChildren<{ className?: string; class?: string }>,
) {
  const { children, className } = props
  if (props.class?.startsWith('language-')) {
    // 如果是块级代码，渲染为高亮代码块
    return <CodeBlock className={props.class}>{children}</CodeBlock>
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
    // <pre>
    <code ref={codeRef} className={className}>
      {children}
    </code>
    // </pre>
  )
}

export function InlineCode({ children }: React.PropsWithChildren) {
  return <code>{children}</code>
}

// function SyntaxHighlightedCode(props) {
//   const ref = (React.useRef < HTMLElement) | (null > null)

//   useEffect(() => {
//     if (ref.current && props.className?.includes('lang-') && window.hljs) {
//       window.hljs.highlightElement(ref.current)

//       // hljs won't reprocess the element unless this attribute is removed
//       ref.current.removeAttribute('data-highlighted')
//     }
//   }, [props.className, props.children])

//   return <code {...props} ref={ref} />
// }
