/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // NextJS <Image> component needs to whitelist domains for src={}
      {
        protocol: 'https',
        hostname: 'thelandscapeai-photos.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodyParser: {
        sizeLimit: '10mb',
      }
    }
  }
};

module.exports = nextConfig;
