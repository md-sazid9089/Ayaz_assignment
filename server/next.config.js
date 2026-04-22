/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  env: {
    // Expose environment variables to the frontend if needed
    // NEXT_PUBLIC_API_URL is accessible in browser
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://ayaz-assignment.vercel.app" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
