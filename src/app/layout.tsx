import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Sholly | Cybersecurity Engineer",
  description: "Modern cybersecurity engineer portfolio. Threat hunting, DFIR, SOC operations, and secure system development.",
  keywords: "cybersecurity, engineer, portfolio, threat hunting, DFIR, SOC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker">
        {children}
      </body>
    </html>
  );
}