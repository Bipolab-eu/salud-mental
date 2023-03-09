/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: 'pk.eyJ1IjoiYmlwb2xhcC1ldSIsImEiOiJjbGYwOGFmdTYwNnA1M3Z0NTg0eXJva3d3In0.qWCeYjYHkbu_oHwzJoXwtA',
  },
};

module.exports = nextConfig;
