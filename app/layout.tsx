import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

function getSiteUrl() {
  // The site is served from the eliechristine subdomain. metadataBase must match
  // the real host, otherwise Open Graph images resolve to an absolute URL on
  // the wrong domain (the apex) and chat crawlers like WhatsApp fail to
  // download the preview image. NEXT_PUBLIC_SITE_URL can override this.
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://eliechristine.mywedding.events";

  return new URL(
    configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`,
  );
}

const siteUrl = getSiteUrl();
// Use a lightweight 1200x630 cover for link previews. WhatsApp (and most
// chat apps) will not render Open Graph images larger than ~300 KB, so the
// full-resolution photos in /uploads are unsuitable as preview images.
const coverImageUrl = new URL("/uploads/whatsapp-cover.jpeg", siteUrl).toString();
const previewImage = {
  url: coverImageUrl,
  width: 1200,
  height: 630,
  alt: "Elie and Christine wedding invitation",
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Elie & Christine - Wedding Invitation",
  description:
    "Wedding invitation for Elie and Christine on Saturday, August 21, 2027.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Elie & Christine - Wedding Invitation",
    description:
      "Wedding invitation for Elie and Christine on Saturday, August 21, 2027.",
    url: siteUrl.toString(),
    siteName: "Elie & Christine Wedding Invitation",
    type: "website",
    locale: "en_US",
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elie & Christine - Wedding Invitation",
    description:
      "Wedding invitation for Elie and Christine on Saturday, August 21, 2027.",
    images: [previewImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2e5882",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
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
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Libre+Baskerville:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ visibility: "hidden" }}>
        <noscript>
          <style>{`body{visibility:visible!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
