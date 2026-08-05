import { headers } from "next/headers";
import { Lexend, TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import FooterGate from "../components/layout/footer/FooterGate";
import MainWrapper from "../components/MainWrapper";
import InitialLoadOverlay from "../components/ui/pageLoader/InitialLoadOverlay";
import Providers from "../lib/providers";
import AOSProvider from "../lib/AOSProvider";
import { Toaster } from "react-hot-toast";
import { NonceProvider } from "../lib/NonceProvider";
import "../styles/custom.css";
import "../styles/globals.css";
import "../styles/program.css";
import "../components/ui/pageLoader/page-loader.css";

const tasaOrbiter = TASA_Orbiter({
  subsets: ["latin"],
  variable: "--font-tasa",
  display: "swap",
});

const fontLexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? "";

  return (
    <html lang="en" className={`${tasaOrbiter.variable} ${fontLexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NonceProvider nonce={nonce}>
          <Providers>
            <AOSProvider>
              <InitialLoadOverlay />
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <FooterGate>
                <Footer />
              </FooterGate>
              <Toaster />
            </AOSProvider>
          </Providers>
          <ScriptLoader />
        </NonceProvider>
      </body>
    </html>
  );
}