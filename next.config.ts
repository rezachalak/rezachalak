import type { NextConfig } from "next";

const SLIDES = "/talos-cncf-vienna-sep-2026";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // The talk deck is a static HTML file under public/. Next.js does not
      // serve index.html for a bare directory path, and this URL is printed
      // as a QR code on the deck's closing slide, so it has to keep working.
      { source: SLIDES, destination: `${SLIDES}/index.html` },
    ];
  },
};

export default nextConfig;
