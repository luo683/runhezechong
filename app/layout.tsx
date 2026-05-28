import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import SessionProvider from "@/components/SessionProvider";

const fontUrl =
  "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";

export const metadata: Metadata = {
  title: "润禾泽宠 — 润养本草 恩泽爱宠",
  description: "草本宠物食品品牌，药食同源，科学配比。为猫狗提供天然健康的日常饮食。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body className="bg-warm-bg text-warm-text font-sans">
        <SplashScreen />
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
