import { TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";

import "./globals.css";
import "./parser.css";

import { apiFetch } from "../lib/api";
import Providers from "../lib/providers";

const tasaOrbiter = TASA_Orbiter({
  subsets: ["latin"],
  variable: "--font-tasa",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: headerData, error: headerError } = await apiFetch(
    "menu?location=header",
    { revalidate: 300, timeoutMs: 7_500 },
  );

  if (headerError) {
    console.error("Header fetch failed:", headerError);
  }

  return (
    <html lang="en" className={`${tasaOrbiter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header headerData={headerData} />
          <main>{children}</main>
          <Footer />
        </Providers>
        <ScriptLoader />
      </body>
    </html>
  );
}
