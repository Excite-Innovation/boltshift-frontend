import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { inter, merriweather, jetBrainsMono } from "@/lib/fonts";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

/* METADATA CONFIGURATION */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

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
    images: [{ url: "/opengraph-image.png" }],
  },
};

/* VIEWPORT CONFIGURATION */
export const viewport = {
  themeColor: "#ee2255",
};

/* ROOT LAYOUT COMPONENT */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-360 m-auto p-4 md:px-4 md:pb-4 md:pt-0">
            <SidebarProvider>{children}</SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
