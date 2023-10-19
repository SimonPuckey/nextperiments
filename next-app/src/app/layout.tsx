import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PlainQCProvider } from "../utils/query-client-providers";

const inter = Inter({ subsets: ["latin"] });

// TODO: put pwa metadata here?
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlainQCProvider>{children}</PlainQCProvider>
      </body>
    </html>
  );
}
