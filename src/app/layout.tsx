import { Lexend, TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import MainWrapper from "../components/MainWrapper";
import 'animate.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/fancybox.css'
import "../styles/custom.css";
import "../styles/program.css";
import "../styles/globals.css";
import "../styles/inner.css";
// import "../styles/inner1.css";
import "../styles/parser.css";
import "../styles/module.css";
import "../styles/responsive.css";
import "../styles/responsive1.css";



import { apiFetch } from "../lib/api";
import Providers from "../lib/providers";
import Wowjs from "../lib/wow";
import AOSProvider from "../lib/AOSProvider";

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
    <html lang="en" className={`${tasaOrbiter.variable} ${fontLexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <AOSProvider>
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
