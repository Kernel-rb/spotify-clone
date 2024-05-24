import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FaborFy",
  description: "Where you can find all underrated songs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>
        {children}
        </Sidebar>
      </body>
    </html>
  );
}
