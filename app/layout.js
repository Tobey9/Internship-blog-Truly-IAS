import "./globals.css";
import { Open_Sans, Josefin_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "My Blog",
  description: "Just a blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${josefinSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
