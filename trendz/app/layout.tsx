// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
  keywords: [
    "TrendZ",
    "Nigeria news",
    "Africa news",
    "world news",
    "flight booking",
    "hotel booking",
    "cheap flights",
    "luxury hotels",
    "real-time news Africa",
    "book flights online",
    "5-star hotels",
  ],
  authors: [{ name: "TrendZ Africa", url: "https://trendz.ng" }],
  creator: "TrendZ Team",
  publisher: "TrendZ Media Ltd",

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://trendz.ng",
    siteName: "TrendZ",
    title: "TrendZ – Africa's Smartest News & Travel Platform",
    description:
      "Real-time news • Instant flight & hotel booking • Built in Lagos, Nigeria",
    images: [
      {
        url: "https://trendz.africa/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TrendZ – Real-Time News & Travel Booking Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@TrendZAfrica",
    creator: "@TrendZAfrica",
    title: "TrendZ – Africa’s #1 News & Travel App",
    description: "Breaking news, flight deals, luxury hotels — all in one app.",
    images: "https://trendz.africa/twitter-image.jpg",
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

  alternates: {
    canonical: "https://trendz.africa",
  },

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Your icons */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ✅ Google AdSense Meta Verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-5022855407701372"
        />

        {/* ✅ AdSense Script (Required) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5022855407701372"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body
        className={`${inter.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
