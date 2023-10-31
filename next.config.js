/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: false,
  },
  images: {
    unoptimized: true
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
