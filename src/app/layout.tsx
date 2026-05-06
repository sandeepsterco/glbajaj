import { TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import MainWrapper from "../components/MainWrapper";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/fancybox.css'
import "../styles/custom.css";
import "../styles/program.css";
import "../styles/globals.css";
import "../styles/inner.css";
import "../styles/inner1.css";
import "../styles/parser.css";
import "../styles/module.css";


import { apiFetch } from "../lib/api";
import Providers from "../lib/providers";

const tasaOrbiter = TASA_Orbiter({
  subsets: ["latin"],
  variable: "--font-tasa",
  display: "swap",
});

async function getHeaderData(){
  const [headerRes, sidebarRes] = await Promise.all([
    apiFetch(
      "menu?location=header",
      { cache:'no-store'},
    ),
    apiFetch(
      "menu?location=sidebar",
      { cache:'no-store' },
    )
  ])

  return {
    headerMenu: headerRes.data,
    sidebarMenu: sidebarRes.data,
    error: headerRes.error || sidebarRes.error,
  }
  // const { data: headerData, error: headerError } = await 
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeaderData();

  return (
    <html lang="en" className={`${tasaOrbiter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header headerData={headerData} />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </Providers>
        <ScriptLoader />
      </body>
    </html>
  );
}
