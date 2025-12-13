// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "TrendZ – Real-Time News, Flight & Hotel Booking in Nigeria & Africa",
    template: "%s | TrendZ Africa",
  },
  description:
    "TrendZ is Africa's smartest platform for real-time verified news, instant flight booking, and luxury hotel reservations. Built in Lagos. Trusted by millions.",
  
  // FIX 1: ALL URLs must be https://www.trendz.ng (exact match!)
  metadataBase: new URL("https://www.trendz.ng"),

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.trendz.ng",
    siteName: "TrendZ",
    title: "TrendZ – Africa's Smartest News & Travel Platform",
    description: "Real-time news • Instant flight & hotel booking • Built in Lagos, Nigeria",
    images: [
      {
        url: "https://www.trendz.ng/og-image.jpg",    // ← Fixed domain
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
    description: "Breaking news, flight deals, luxury hotels — all in one app.",
    images: "https://www.trendz.ng/twitter-image.jpg",  // ← Fixed
  },

  alternates: {
    canonical: "https://www.trendz.ng",  // ← THIS WAS THE KILLER BUG (was .africa!)
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical: Must match EXACTLY what you entered in AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5022855407701372" />
        <meta name="monetag" content="9d939e2218565f188809785e5231a094"></meta>
        <script src="https://quge5.com/88/tag.min.js" data-zone="192732" async data-cfasync="false"></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5022855407701372"
          crossOrigin="anonymous"
        ></script>
        <meta name="p:domain_verify" content="0a4951710a0c2c6e11db78d078df52bb"/>
        {/* Force www + https redirect (Next.js middleware will handle this) */}
        <link rel="canonical" href="https://www.trendz.ng" />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-white`}>
        {children}
      </body>
    </html>
  );
}