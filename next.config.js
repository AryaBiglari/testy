/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  swcMinify: true,
  env: {
    mongodb_password: "MpAlqi5Clh8MpCKy",
    deletePartPassword: "DeleteIt2024",
    OPENAI_API_KEY: "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",
    loginPassword: "Platinum2024",
  },
  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
