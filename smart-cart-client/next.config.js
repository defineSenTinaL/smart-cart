/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverComponentsExternalPackages: ['pino'],
  // },
    images: {
        domains: ['ik.imagekit.io', 'daisyui.com'], // Add the hostname(s) here
      },

    async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            // {
            //   key: 'Content-Security-Policy',
            //   value:
            //     "default-src 'self' 'https://dintly.in'; image-src 'https://ik.imagekit.io'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
            // },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // {
            //   key: 'Permissions-Policy',
            //   value: "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
            // },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },
}

module.exports = nextConfig
