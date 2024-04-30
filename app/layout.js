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
        className={`${inter.className} flex flex-col justify-center align-center items-center min-h-screen`}
      >
        <main className="w-full max-w-[950px] p-10">{children}</main>
      </body>
    </html>
  );
}
