/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'm.media-amazon.com',
      'promontory.sd33.bc.ca',
      'encrypted-tbn0.gstatic.com'
    ],
  },
};

export default nextConfig;
