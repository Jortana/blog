// @ts-check
import { withContentlayer } from 'next-contentlayer'

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withContentlayer({
  output: 'export',
})

export default nextConfig
