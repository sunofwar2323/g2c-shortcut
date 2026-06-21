import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Smarter G2C Station | Your Guide to Bhutan Government Services",
  description:
    "Search and browse Bhutan government services. Find security clearance, passports, business licenses, and more with step-by-step guides.",
  keywords: [
    "Bhutan government services",
    "G2C",
    "citizen services",
    "security clearance",
    "passport Bhutan",
    "business license",
  ],
  openGraph: {
    title: "Smarter G2C Station",
    description: "Your Guide to Bhutan Government Services",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
