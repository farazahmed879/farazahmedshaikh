import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Big_Shoulders, DotGothic16 } from "next/font/google";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-barlow", display: "swap" });
const barlowCond = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-barlow-cond", display: "swap" });
// Next.js has no metrics for Big Shoulders, so skip its auto-generated fallback and name our own.
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-shoulders",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});
const dot = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--font-dot", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteContent();
  const title = profile.seoTitle || profile.name;
  const description = profile.seoDescription || profile.tagline;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    openGraph: { title, description, type: "website", images: ["/social-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/social-image.png"] },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = { themeColor: "#03140d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCond.variable} ${shoulders.variable} ${dot.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
