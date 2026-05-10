import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Sora,
} from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteBackdrop } from "@/components/system/site-backdrop";

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Traveloop",
    template: "%s | Traveloop",
  },
  description: "Premium multi-city travel planning foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${display.variable} ${mono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <AppProviders>
          <SiteBackdrop />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
