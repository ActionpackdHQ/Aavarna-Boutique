import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aavarna Boutique — Custom Designer Studio | Chennai",
  description:
    "Custom designer stitching studio in Chennai. Bring your fabric — blouses, ethnic wear, Aari, western & kids. WhatsApp +91 81900 07072.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/aavarna-logo-hd.svg",
  },
  openGraph: {
    title: "Aavarna Boutique — Stitched for you.",
    description:
      "Custom designer studio · Chennai. Blouses, lehengas, Aari & more — your fabric, our stitch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-campaign-silk-drape.webp"
        />
      </head>
      <body className="bg-charcoal text-ivory antialiased">{children}</body>
    </html>
  );
}
