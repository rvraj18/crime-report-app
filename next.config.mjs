
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // disables ESLint blocking on build
    },
  }
  
  export default {
    reactStrictMode: true,
    // other config
  }