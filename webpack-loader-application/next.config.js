const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: 'styled-px2rem-loader',
      options: {
        rootValue: 3.75,
        unitPrecision: 2,
        transformRuntime: true,
        transformJSX: true,
      }
    });
    return config;
  }
};

module.exports = nextConfig
