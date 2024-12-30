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
        source: '/leeornahum.com',
        destination: '/leeornahum.com/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 