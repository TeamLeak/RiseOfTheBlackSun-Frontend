/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true, // Только для временного обхода
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true, // Отключает обработку Next.js
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    output: 'export',
};

module.exports = nextConfig;
