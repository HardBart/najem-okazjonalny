import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Ustal katalog projektu jako root (wycisza ostrzeżenie o wielu plikach lockfile).
  outputFileTracingRoot: __dirname,
  // Nie blokuj produkcyjnego buildu na regułach ESLint (typy sprawdza `tsc`).
  // Lint uruchamiaj lokalnie: `npm run lint`.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
