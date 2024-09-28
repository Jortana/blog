import { withContentlayer } from 'next-contentlayer'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withContentlayer({
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有域名
      },
    ],
  },
})

export default nextConfig
