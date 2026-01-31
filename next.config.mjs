/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure the build doesn't fail on submodule warnings
  swcMinify: true,
};

export default nextConfig;