/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Отключает обработку Next.js
    },
   output: 'export',
};

module.exports = nextConfig;
