// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrendZ – Real-Time News, Flight & Hotel Booking in Nigeria & Africa",
    template: "%s | TrendZ Africa",
  },
  description:
    "TrendZ is Africa's smartest platform for real-time verified news, instant flight booking, and luxury hotel reservations. Built in Lagos. Trusted by millions.",

  metadataBase: new URL("https://www.trendz.ng"),

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.trendz.ng",
    siteName: "TrendZ",
    title: "TrendZ – Africa's Smartest News & Travel Platform",
    description:
      "Real-time news • Instant flight & hotel booking • Built in Lagos, Nigeria",
    images: [
      {
        url: "https://www.trendz.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TrendZ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@TrendZAfrica",
    creator: "@TrendZAfrica",
    title: "TrendZ – Africa’s #1 News & Travel App",
    description:
      "Breaking news, flight deals, luxury hotels — all in one app.",
    images: "https://www.trendz.ng/twitter-image.jpg",
  },

  alternates: {
    canonical: "https://www.trendz.ng",
  },

  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Verification tags */}
        <meta
          name="google-adsense-account"
          content="ca-pub-5022855407701372"
        />
  
        <meta
          name="p:domain_verify"
          content="0a4951710a0c2c6e11db78d078df52bb"
        />

       
      </head>

      <body>{children}</body>
    </html>
  );
}
