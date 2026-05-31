import { cache } from "react";
import { Lexend, TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import MainWrapper from "../components/MainWrapper";
// import 'animate.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/custom.css";
// import "../styles/program.css";
import "../styles/globals.css";
// import "../styles/module.css";

import { apiFetch } from "../lib/api";
import Providers from "../lib/providers";
import AOSProvider from "../lib/AOSProvider";
// import NavigationProgress from "../components/ui/pageLoader/NavigationProgress";
// import InitialLoadOverlay from "../components/ui/pageLoader/InitialLoadOverlay";

const tasaOrbiter = TASA_Orbiter({
  subsets: ["latin"],
  variable: "--font-tasa",
  display: "swap",
});

const fontLexend = Lexend({
  subsets:['latin'],
  display:'swap',
  variable:'--font-lexend'
})

const getHeaderData = cache(async function getHeaderData() {
  const [headerRes, sidebarRes] = await Promise.all([
    apiFetch("menu?location=header", { revalidate: 600 }),
    apiFetch("menu?location=sidebar", { revalidate: 600 }),
  ]);

  return {
    headerMenu: headerRes.data,
    sidebarMenu: sidebarRes.data,
    error: headerRes.error || sidebarRes.error,
  }
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeaderData();

  return (
    <html lang="en" className={`${tasaOrbiter.variable} ${fontLexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <AOSProvider>
            {/* <InitialLoadOverlay /> */}
            {/* <NavigationProgress /> */}
            <Header headerData={headerData} />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </AOSProvider>
        </Providers>
        <ScriptLoader />
      </body>
    </html>
  );
}
