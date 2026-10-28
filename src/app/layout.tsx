import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dgcomputer.com.br"),
  title: {
    default: "DG Computer · Manutenção, suporte de TI e PC Gamer em Manaus",
    template: "%s · DG Computer",
  },
  description:
    "Manutenção de computadores e notebooks, suporte de TI, consultoria, redes e PC Gamer no Centro de Manaus. Atendimento também a domicílio.",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${unbounded.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-dg-orange focus:px-4 focus:py-2 focus:text-dg-ink"
          >
            Pular para o conteúdo
          </a>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
