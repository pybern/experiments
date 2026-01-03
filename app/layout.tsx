import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL("https://wemovex.com.au"),
  title: {
    default: "WeMoveX - Australia's #1 Vehicle Transport Company",
    template: "%s | WeMoveX",
  },
  description: "Professional vehicle transport services across Australia. Car shipping, motorcycle delivery, caravan transport, heavy machinery logistics. Fully insured, door-to-door delivery with real-time tracking.",
  keywords: [
    "vehicle transport Australia",
    "car shipping",
    "motorcycle transport",
    "caravan delivery",
    "heavy machinery logistics",
    "interstate car transport",
    "vehicle delivery service",
    "auto transport",
    "Sydney to Melbourne car transport",
    "Brisbane vehicle shipping",
  ],
  authors: [{ name: "WeMoveX" }],
  creator: "WeMoveX",
  publisher: "WeMoveX Pty Ltd",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://wemovex.com.au",
    siteName: "WeMoveX",
    title: "WeMoveX - Australia's #1 Vehicle Transport Company",
    description: "Professional vehicle transport services across Australia. Fully insured, door-to-door delivery with real-time tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WeMoveX Vehicle Transport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeMoveX - Australia's #1 Vehicle Transport Company",
    description: "Professional vehicle transport services across Australia. Fully insured, door-to-door delivery with real-time tracking.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
