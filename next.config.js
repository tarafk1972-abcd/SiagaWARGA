const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // disable in dev
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache pages for offline viewing
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Forces Next.js to build standard HTML/CSS for APK
  images: {
    unoptimized: true, // Required for static export
  }
}

module.exports = withPWA(nextConfig)