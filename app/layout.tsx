import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "汪昊阳 · 个人主页",
  description: "来自广州的准大一新生汪昊阳的个人主页，记录生活经历、兴趣、摄影与成长。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
