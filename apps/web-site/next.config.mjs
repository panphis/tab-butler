/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: '../../docs',
  images: { unoptimized: true },
}

export default nextConfig
