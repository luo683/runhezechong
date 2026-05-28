import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "润禾泽宠 | 草本宠物食品",
  description: "新锐草本宠物食品品牌，用自然草本力量呵护宠物健康",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
