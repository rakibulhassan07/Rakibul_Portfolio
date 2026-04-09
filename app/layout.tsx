import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "RAKIBUL HASSAN",
  description: "Modern portfolio website showcasing creative work",
  icons: {
    icon: "https://i.ibb.co/pj4Rtsyk/jpg.jpg",
    shortcut: "https://i.ibb.co/pj4Rtsyk/jpg.jpg",
    apple: "https://i.ibb.co/pj4Rtsyk/jpg.jpg",
  },
  openGraph: {
    images: ["https://i.ibb.co/pj4Rtsyk/jpg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
