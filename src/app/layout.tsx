import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Velocity Creative",
  description: "Velocity Creative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/Frick0.3-Regular.woff2"
          as="font"
          crossOrigin=""
        />
      </Head>
      <body
        className={`${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};
