import type { Metadata } from "next"
import Image from "next/image"

import { CtaAtendimento } from "@/components/layout/cta-atendimento"
import { Container, Eyebrow, PageHero } from "@/components/layout/section"
import { BlurFade } from "@/components/ui/blur-fade"
import { Marquee } from "@/components/ui/marquee"

export const metadata: Metadata = {
  title: "História",
  description: "Como a DG Computer saiu da bancada de manutenção no Centro de Manaus para o suporte de TI, o design e o PC Gamer.",
}

// Os capítulos seguem a ordem em que os serviços foram surgindo.
// TODO(DG): confirmar com a empresa o ano de cada etapa para exibir no marcador.
const capitulos = [
  {
    marco: "O começo",
    titulo: "Uma bancada no Centro de Manaus",
    texto:
      "A DG Computer nasceu consertando computadores. Manutenção preventiva e corretiva, upgrades e regravação de BIOS na Rua Apurinã, no Centro, com atendimento também na casa do cliente.",
    imagem: "/images/manutencao/corretiva.jpg",
  },
  {
    marco: "Empresas",
    titulo: "Do conserto ao suporte de TI",
    texto:
      "Computador parado custa caro para quem depende dele. Por isso a DG passou a cuidar da infraestrutura de empresas: suporte, redes ethernet e wireless e consultoria para planejar a TI.",
    imagem: "/images/servicos/suporte-ti.jpg",
  },
  {
    marco: "Design e sites",
    titulo: "A identidade dos clientes também",
    texto:
      "Vieram logomarcas, flyers, banners e sites, como os da Larifo Transportes, de Caibi-SC, da Amazon Soccer e da Oficina do Berg, em Manaus.",
    imagem: "/images/portfolio/larifo.jpg",
  },
  {
    marco: "PC Gamer",
    titulo: "Máquinas montadas sob medida",
    texto:
      "Com a experiência de bancada, a DG passou a montar PCs Gamer em várias configurações e gerações, testados antes de sair da loja.",
    imagem: "/images/servicos/pc-gamer.jpg",
  },
  {
    marco: "Hoje",
    titulo: "O estoque da loja na internet",
    texto:
      "Este site mostra os produtos direto do sistema de estoque da DG, para você conferir o que tem disponível antes de ir até a loja.",
    imagem: "/images/manutencao/upgrade.jpg",
  },
]

const flyers = [1, 3, 4, 5].map((n) => `/images/pc-gamer/flyer-${n}.png`)

export default function HistoriaPage() {
  return (
    <>
      <PageHero eyebrow="Nossa história" titulo="Da bancada de conserto ao estoque online">
        <p>
          Cada serviço da DG Computer surgiu de uma necessidade dos clientes. Esta é a ordem em que eles foram chegando.
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container>
          <ol className="relative grid gap-16 md:gap-24">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            {capitulos.map((c, i) => (
              <li key={c.marco} className="relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  aria-hidden="true"
                  className="led absolute top-1 left-0 h-6 w-3 md:left-1/2 md:-translate-x-1/2"
                />
                <BlurFade inView className={i % 2 ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right"}>
                  <p className="font-mono text-xs tracking-[0.18em] text-dg-orange-deep uppercase">{c.marco}</p>
                  <h2 className="mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-4xl">{c.titulo}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{c.texto}</p>
                </BlurFade>
                <BlurFade inView delay={0.1} className={i % 2 ? "md:order-1" : undefined}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={c.imagem} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                  </div>
                </BlurFade>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="dark overflow-hidden bg-background py-20 text-foreground">
        <Container>
          <Eyebrow>Montagens da DG</Eyebrow>
          <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
            Algumas configurações que já saíram da bancada
          </h2>
        </Container>
        <Marquee pauseOnHover className="mt-10 [--duration:45s] [--gap:1.25rem]">
          {flyers.map((src) => (
            <div key={src} className="relative size-64 overflow-hidden rounded-xl sm:size-80">
              <Image src={src} alt="Flyer de PC Gamer montado pela DG Computer" fill sizes="320px" className="object-cover" />
            </div>
          ))}
        </Marquee>
      </section>

      <CtaAtendimento />
    </>
  )
}
