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
          <main className="flex-grow sm:mx-4 md:mx-8 lg:mx-16 my-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
