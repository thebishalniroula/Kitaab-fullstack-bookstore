/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "static-01.daraz.com.np",
      "images-na.ssl-images-amazon.com",
      "m.media-amazon.com",
      "cdn.pixabay.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
