/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["pt-BR", "en-US"],
    defaultLocale: "pt-BR"
  },
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
