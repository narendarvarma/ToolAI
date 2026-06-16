/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://adservice.google.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
              "frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "connect-src 'self' https://openrouter.ai https://pagead2.googlesyndication.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://ep1.adtrafficquality.google https://adservice.google.com https://www.googletagmanager.com https://cdnjs.cloudflare.com",
              "img-src 'self' data: blob: https:",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig