import "./globals.css";
import {Inter} from 'next/font/google'
import Providers from "./Providers";

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
        {children}
      </body>
        </Providers>
    </html>
  );
}
