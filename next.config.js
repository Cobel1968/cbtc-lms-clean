/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows the build to succeed even if there are linting errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This ignores type errors during build as well
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
