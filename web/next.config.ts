import type { NextConfig } from 'next'
import path from 'path'

const BASE_PATH = '/Horizon-Care-Services'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
}

export default nextConfig
