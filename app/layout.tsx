import {Lato} from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";

// const sansSerifFont = DM_Sans({subsets: ["latin"]});
const sansSerifFont = Lato({subsets: ["latin"], weight: "400"});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={sansSerifFont.className}>
        <div className="flex flex-col min-h-screen justify-between">
          <Navbar />
          <main className="flex-grow px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
