import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // pdfmake/pdfkit/fontkit korzystają z plików danych (.trie/.afm), których webpack
  // nie pakuje — ładujemy je z node_modules w runtime (tylko serwer).
  serverExternalPackages: ['pdfmake'],
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
