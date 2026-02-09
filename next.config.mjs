/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/city-of-calgary/cybersecurity-student",
        destination: "/for/city-of-calgary/cybersecurity-student",
        permanent: true,
      },
      {
        source: "/city-of-calgary/pmis-student",
        destination: "/for/city-of-calgary/pmis-student",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
