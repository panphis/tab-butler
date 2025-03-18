import type { Metadata } from "next";
import { Layout } from "@/components/layouts"
import "./globals.css";

export const metadata: Metadata = {
};

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
