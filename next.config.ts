/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000',
        'https://atlas-cinema-guru-ecru.vercel.app',
        'https://atlas-cinema-guru-6pdcxpsaf-frankblations-projects.vercel.app',
      ],
    },
  },
};

export default nextConfig;