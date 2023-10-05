const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
