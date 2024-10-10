'use client'

import { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

export function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // 等到组件在客户端渲染时才启用 Zoom
    setIsClient(true)
  }, [])
  // return <></>
  return isClient ? (
    <Zoom>
      <img src={src} alt={alt} />
    </Zoom>
  ) : (
    <img src={src} alt={alt} />
  )
}
