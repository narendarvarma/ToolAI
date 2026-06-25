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
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://my.rtmark.net https://jhnwr.com https://nap5k.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://adservice.google.com https://cdn.jsdelivr.net https://pl29888573.effectivecpmnetwork.com https://pl29888574.effectivecpmnetwork.com https://www.highperformanceformat.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
              "frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.effectivecpmnetwork.com https://www.highperformanceformat.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google.com",
              "connect-src 'self' https://nap5k.com https://my.rtmark.net https://jhnwr.com https://csi.gstatic.com https://openrouter.ai https://pagead2.googlesyndication.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://adservice.google.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://*.effectivecpmnetwork.com https://www.highperformanceformat.com",
              "img-src 'self' data: blob: https:",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "manifest-src 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig