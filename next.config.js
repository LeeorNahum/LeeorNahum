/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/leeornahum.com',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/leeornahum.com/',
  trailingSlash: true,
}

module.exports = nextConfig 