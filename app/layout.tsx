import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import { NavBar } from "@/components/Nav";
import Provider from "@/components/Provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Freshta - Home",
  description:
    "Buy fresh produce fruits and vegetables from local stores near you",
  keywords: "freshta, fresh produce, buy, vegetables, fruits, local produce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} overflow-x-hidden scroll-smooth relative`}
      >
        <Provider>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
