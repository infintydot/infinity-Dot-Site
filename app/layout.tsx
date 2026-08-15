import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Premium Typography setup
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infinity dot | Turning Ideas Into Digital Reality",
  description:
    "Premium software development company specializing in custom software, AI solutions, Web3, and enterprise digital transformation.",
  keywords: ["Software Development", "AI Solutions", "UI/UX Design", "Enterprise Software", "Infinity dot"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white`}
      >
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
