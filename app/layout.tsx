import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { inter, merriweather, jetBrainsMono } from "@/lib/fonts"
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

// Include project metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Boltshift",
    template: "%s | Boltshift",
  },

  description:
    "Modern e-commerce platform designed to help stores showcase, manage, and sell their products seamlessly.",

  openGraph: {
    url: "/",
    title: "Boltshift",
    description:
      "Modern e-commerce platform designed to help stores showcase, manage, and sell their products seamlessly.",
    siteName: "Boltshift",
    images: [{ url: '/opengraph-image.png' }],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={ inter.className }
      suppressHydrationWarning
    >
      <head />
      <body
        className="max-w-[1440px] m-auto px-4 pb-4"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
