import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CS596 Final Project",
  description: "Dapp to manage Certificates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto max-w-[1000px] min-h-screen flex flex-col justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
