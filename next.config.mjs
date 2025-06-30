/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"], // keep console.error
    },
  },
};

export default nextConfig;
