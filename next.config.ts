import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.google.com', 'images.unsplash.com', 'tu-dominio.com'],
    unoptimized: true, // Necesario para la exportación estática
  },
  output: 'export',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
