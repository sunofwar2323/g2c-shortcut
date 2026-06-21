import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smarter G2C Station | Your AI Guide to Bhutan Government Services",
  description:
    "Search, ask questions, and get step-by-step guidance for Bhutan government services powered by AI. Find security clearance, passports, business licenses, and more.",
  keywords: [
    "Bhutan government services",
    "G2C",
    "citizen services",
    "AI assistant",
    "security clearance",
    "passport Bhutan",
    "business license",
  ],
  openGraph: {
    title: "Smarter G2C Station",
    description: "Your AI Guide to Bhutan Government Services",
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
