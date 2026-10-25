import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MariRealty — Secure Real Estate Investments in Lagos",
    template: "%s | MariRealty",
  },
  description:
    "Lagos-based real estate advisory and RECB cooperative investment platform. Licensed under Lagos State Cooperative LSCS 18176. Secure land banking, cashback investments, and verified property listings.",
  keywords: [
    "Lagos real estate",
    "RECB cashback",
    "cooperative investment Nigeria",
    "land banking Lagos",
    "Zylus Group",
    "diaspora real estate investment",
    "property investment Nigeria",
  ],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "192x192" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "MariRealty",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
