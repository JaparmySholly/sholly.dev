import "./globals.css";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Japarmy Sholly | Cybersecurity Engineer & Software Developer",

  description:
    "Portfolio of Japarmy Sholly featuring cybersecurity projects, DFIR research, malware analysis, software development, technical writing, and security insights.",

  keywords:
    "cybersecurity engineer, DFIR, malware analysis, SOC operations, threat hunting, software developer, portfolio, cybersecurity research",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Japarmy Sholly | Cybersecurity Engineer & Software Developer",

    description:
      "Explore cybersecurity projects, DFIR research, malware detection systems, software development work, and technical insights.",

    url: "https://japarmysholly.dev",

    siteName: "Japarmy Sholly",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japarmy Sholly Portfolio",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Japarmy Sholly | Cybersecurity Engineer & Software Developer",

    description:
      "Cybersecurity projects, DFIR research, software development, malware analysis, and technical writing.",

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("scroll-smooth font-sans", outfit.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}