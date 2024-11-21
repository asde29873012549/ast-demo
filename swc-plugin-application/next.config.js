/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [
      ["swc_plugin_styled_px2rem", { 
        "transform_jsx_attributes": true,
        "unit_precision": 3
       }],
    ],
  },
};

module.exports = nextConfig
