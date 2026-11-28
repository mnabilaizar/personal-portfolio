/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/tentang", destination: "/#tentang", permanent: true },
      { source: "/contact", destination: "/#kontak", permanent: true },
    ];
  },
};

export default nextConfig;
