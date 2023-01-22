/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xivapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
