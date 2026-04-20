/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["unicornstudio-react"],
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["unicornstudio-react"],
  },
};

export default nextConfig;
