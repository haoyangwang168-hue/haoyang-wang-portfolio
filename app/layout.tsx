import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "汪昊阳 · 个人作品集",
  description: "来自广州的准大一新生汪昊阳的个人经历、摄影作品与能力档案。",
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
