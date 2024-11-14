/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Activa la minificación de SWC
  compiler: {
    react: {
      throwIfNamespace: false, // Desactiva el error de namespace
    },
  },
};

module.exports = nextConfig;
