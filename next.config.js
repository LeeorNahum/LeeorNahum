/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/leeornahum.com',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
  assetPrefix: '/leeornahum.com/',
}

module.exports = nextConfig 