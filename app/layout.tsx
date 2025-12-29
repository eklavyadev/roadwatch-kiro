import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "RoadWatch",
  description:
    "A geo-tagged platform for reporting and tracking potholes to improve road safety",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} font-mono bg-[#020817] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
