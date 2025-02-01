// import {Inter} from "next/font/google"

// const inter=Inter({subsets:["latin"]})
import "./globals.css";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body>
        {children}
      </body>
      </Providers>
    </html>
  );
}
