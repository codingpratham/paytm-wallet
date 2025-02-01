import "./globals.css";
import {Inter} from 'next/font/google'
import Providers from "./Providers";
import { AppbarClient } from "./components/AppbarClient";
import Layout from "./(dashboard)/layout";

const inter = Inter ({subsets:["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Providers>
      <body className={inter.className}>
          <AppbarClient/>
          
        {children}
          
      </body>
        </Providers>
    </html>
  );
}
