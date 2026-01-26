/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'supabase.co'], // Add your supabase project domain here later
  },
}
module.exports = nextConfig
