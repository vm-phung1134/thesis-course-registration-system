const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.pexels.com",
      "cdn-icons-png.flaticon.com",
      "yu.ctu.edu.vn",
      "images.pexels.com",
      "img.icons8.com",
      "lh3.googleusercontent.com",
      "carolinametrotech.com",
      "www.honorofkings.com",
    ],
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
