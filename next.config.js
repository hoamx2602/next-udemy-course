/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    mongodb_username: process.env.MONGODB_USERNAME,
    mongodb_password: process.env.MONGODB_PASSWORD,
    mongodb_clustername: process.env.MONGODB_CLUSTERNAME,
    mongodb_database: process.env.MONGODB_DATABASE,
  },
};

module.exports = nextConfig;
