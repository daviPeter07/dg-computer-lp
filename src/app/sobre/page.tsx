import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { CtaAtendimento } from "@/components/layout/cta-atendimento"
import { Container, Eyebrow, PageHero } from "@/components/layout/section"
import SpotlightCard from "@/components/react-bits/SpotlightCard"
import { BlurFade } from "@/components/ui/blur-fade"
import { diferenciais, portfolio } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a DG Computer: manutenção, suporte de TI, redes, consultoria e design gráfico em Manaus.",
}

const areas = [
  { titulo: "Consultoria", texto: "Planejamento de TI para a sua empresa gastar menos e parar menos." },
  { titulo: "Suporte e manutenção", texto: "Hardware e software, preventiva e corretiva, na loja ou a domicílio." },
  { titulo: "Redes", texto: "Instalação e configuração de redes ethernet e wireless." },
  { titulo: "Design gráfico", texto: "Logomarcas, flyers, banners e identidade visual." },
  { titulo: "Sites", texto: "Desenvolvimento de sites institucionais para pequenas e médias empresas." },
  { titulo: "PC Gamer", texto: "Montagem de máquinas em várias configurações e gerações." },
]

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Sobre a DG Computer" titulo="A tecnologia mudou o trabalho. A gente mantém ela funcionando.">
        <p>
          O computador se tornou essencial para produzir, reduzir custos e se comunicar. Quando ele para, a empresa
          perde produtividade e pode perder clientes.
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 text-lg">
            <Eyebrow>Quem somos</Eyebrow>
            <p>
              A <strong className="font-semibold">DG Computer</strong> é uma empresa de informática do Centro de Manaus
              que reúne, num só lugar, os serviços que mantêm casas e empresas conectadas.
            </p>
            <p className="text-muted-foreground">
              Fazemos consultoria, suporte e manutenção de hardware e software, instalação de redes ethernet e wireless
              e, ainda, toda a gama de design gráfico: logomarcas, flyers, banners e identidade visual.
            </p>
            <p className="text-muted-foreground">
              Atendemos no balcão da Rua Apurinã e também a domicílio, de segunda a sábado.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/manutencao/upgrade.jpg"
              alt="Técnico instalando memória na placa-mãe de um computador"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-dg-paper py-20 md:py-28">
        <Container>
          <Eyebrow>O que fazemos</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
            Uma plataforma de serviços de informática
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.titulo} className="border-t-2 border-dg-ink pt-5">
                <h3 className="font-display text-lg font-medium">{a.titulo}</h3>
                <p className="mt-2 text-muted-foreground">{a.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="dark bg-background py-20 text-foreground md:py-28">
        <Container>
          <Eyebrow>Diferenciais</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
            Por que contratar uma equipe de TI
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map((d, i) => (
              <BlurFade key={d.titulo} delay={0.08 * i} inView className="h-full">
                <SpotlightCard spotlightColor="#f69323" intensity={0.35} className="h-full p-7">
                  <span aria-hidden="true" className="led h-6 w-2" />
                  <h3 className="mt-6 font-display text-xl font-medium text-white">{d.titulo}</h3>
                  <p className="mt-3 text-sm text-white/65">{d.texto}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Eyebrow>Portfólio de sites</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
            Sites que desenvolvemos
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {portfolio.map((p) => (
              <a
                key={p.nome}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-dg-orange focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
              >
                <div className="relative aspect-[619/403] overflow-hidden border-b border-border">
                  <Image
                    src={p.imagem}
                    alt={`Página inicial do site ${p.nome}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="flex items-center justify-between font-display text-lg font-medium">
                    {p.nome}
                    <ArrowUpRightIcon className="size-5 text-muted-foreground transition-colors group-hover:text-dg-orange" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.texto}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CtaAtendimento titulo="Vamos conversar?" texto="Conte o que você precisa: conserto, suporte para a empresa, um PC novo ou um site." />
    </>
  )
}
