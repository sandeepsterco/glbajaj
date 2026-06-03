import { Lexend, TASA_Orbiter } from "next/font/google";
import Header from "../components/layout/header/Header";
// import ScriptLoader from "../components/ScriptLoader";
import Footer from "../components/layout/footer/Footer";
import MainWrapper from "../components/MainWrapper";
// import 'animate.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/custom.css";
// import "../styles/program.css";
import "../styles/globals.css";
// import "../styles/module.css";

import Providers from "../lib/providers";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${tasaOrbiter.variable} ${fontLexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <AOSProvider>
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </AOSProvider>
        </Providers>
        {/* <ScriptLoader /> */}
      </body>
    </html>
  );
}
