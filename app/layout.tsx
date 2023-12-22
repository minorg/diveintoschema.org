import type {Metadata} from "next";
import {Lato} from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";

// const sansSerifFont = DM_Sans({subsets: ["latin"]});
const sansSerifFont = Lato({subsets: ["latin"], weight: "400"});

export const metadata: Metadata = {
  title: "Dive into Schema.org",
  description: "Exploring uses of schema.org metadata across the web",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={sansSerifFont.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="p-4">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
