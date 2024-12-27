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
      loader: path.resolve(__dirname, '../styled-px2rem-loader/index.js'),
      options: {
        rootValue: 3.75,
        unitPrecision: 2,
        transformRuntime: true,
        transformJSXAttribute: true,
      }
    });
    return config;
  }
};

module.exports = nextConfig
