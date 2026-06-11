import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinishraghav K E | Terminal Portfolio",
  description: "Software Engineer, Full Stack Developer, and Cloud Engineer Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased dark scroll-smooth font-mono`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-50">
        {children}
      </body>
    </html>
  );
}
