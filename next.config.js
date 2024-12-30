/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/leeornahum.com',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 