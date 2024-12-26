import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import Providers from "../redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gemini Garden",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Unna:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
  <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Clicker Script"
        />
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />{" "}
      </head>
      <Providers>
      <body className={inter.className}>
      <Header/>
          {children}
          <Footer/>
      </body></Providers>
    </html>
  );
}
