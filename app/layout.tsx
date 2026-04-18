import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promptua — Modern Teleprompter",
  description: "A sleek, high-performance teleprompter for presenters, content creators, and speakers.",
  openGraph: {
    title: "Promptua — Modern Teleprompter",
    description: "Your words. Front and center. A sleek, high-performance teleprompter.",
    url: "https://promptua.app",
    siteName: "Promptua",
    images: [
      {
        url: "/hero-screen.png",
        width: 1200,
        height: 630,
        alt: "Promptua — Modern Teleprompter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptua — Modern Teleprompter",
    description: "Your words. Front and center. A sleek, high-performance teleprompter.",
    images: ["/hero-screen.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
