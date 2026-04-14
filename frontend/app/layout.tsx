import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContentForge AI",
  description: "Ghostwriter ultra-viral pentru YouTube, TikTok, Reels & X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
