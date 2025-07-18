import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "LATITUDE 59",
  description:
    "Experience LATITUDE 59's electronic music and live events worldwide. Stream tracks, get tickets, and RSVP to exclusive shows.",
  keywords: [
    "electronic music",
    "live events",
    "music production",
    "beats",
    "dance music",
    "LATITUDE 59",
    "concerts",
    "festivals",
  ],
  authors: [{ name: "LATITUDE 59" }],
  creator: "LATITUDE 59",
  publisher: "LATITUDE 59",
  openGraph: {
    title: "LATITUDE 59 - Electronic Music & Live Events",
    description:
      "Experience LATITUDE 59's electronic music and live events worldwide. Stream tracks, get tickets, and RSVP to exclusive shows.",
    url: "https://wearekream.com",
    siteName: "LATITUDE 59",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KREAM - Electronic Music & Live Events",
    description:
      "Experience KREAM's electronic music and live events worldwide. Stream tracks, get tickets, and RSVP to exclusive shows.",
    creator: "@wearekream",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
