import { Lexend, TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
// import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import FooterGate from "../components/layout/footer/FooterGate";
import MainWrapper from "../components/MainWrapper";
// import InitialLoadOverlay from "../components/ui/pageLoader/InitialLoadOverlay";
import Providers from "../lib/providers";
// import AOSProvider from "../lib/AOSProvider";
import AOSInit from '@/src/lib/AOSInit'
import "../styles/private/custom.css";
import "../styles/private/globals.css";
import "../styles/program.css";
// import "../components/ui/pageLoader/page-loader.css";

const tasaOrbiter = TASA_Orbiter({
  subsets: ["latin"],
  variable: "--font-tasa",
  display: "swap",
  adjustFontFallback: false,
});

const fontLexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className={`${tasaOrbiter.variable} ${fontLexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <Providers>
            {/* <AOSProvider> */}
              {/* <InitialLoadOverlay /> */}
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <FooterGate>
                <Footer />
              </FooterGate>
              {/* <Toaster /> */}
            {/* </AOSProvider> */}
            <AOSInit />
          </Providers>
          {/* <ScriptLoader /> */}
      </body>
    </html>
  );
}