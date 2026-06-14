import type { Metadata } from "next";
import "./globals.css";
import { SideNavbar } from "@/components/layout/SideNavbar";

export const metadata: Metadata = {
  title: "Haliverse",
  description: "A structured universe database.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SideNavbar />
        {children}
      </body>
    </html>
  );
}
