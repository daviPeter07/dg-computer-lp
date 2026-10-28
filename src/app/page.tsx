import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Hero } from "@/components/home/hero"
import { ManutencaoTabs } from "@/components/home/manutencao-tabs"
import { CtaAtendimento } from "@/components/layout/cta-atendimento"
import { Container, Eyebrow } from "@/components/layout/section"
import { ProdutoCard } from "@/components/produtos/produto-card"
import { SincroniaErp } from "@/components/produtos/sincronia-erp"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { getCatalogo } from "@/lib/erp/client"
import { diferenciais, servicos } from "@/lib/site"
import { cn } from "@/lib/utils"

const faixa = [
  "Manutenção preventiva",
  "Upgrade com SSD",
  "Regravação de BIOS",
  "Redes ethernet e wireless",
  "PC Gamer sob medida",
  "Consultoria de TI",
  "Design gráfico",
  "Criação de sites",
]

export default async function Home() {
  const catalogo = await getCatalogo()
  const destaques = catalogo.produtos.filter((p) => p.destaque).slice(0, 4)

  return (
    <>
      <Hero />

      <div className="overflow-hidden border-y border-dg-ink bg-dg-orange py-3 text-dg-ink">
        <Marquee className="[--duration:38s] [--gap:2.5rem] p-0" repeat={3}>
          {faixa.map((item) => (
            <span key={item} className="flex items-center gap-10 font-display text-sm font-medium sm:text-base">
              {item}
              <span aria-hidden="true" className="h-4 w-1.5 rounded-full bg-dg-ink" />
            </span>
          ))}
        </Marquee>
      </div>

      <section id="servicos" className="scroll-mt-20 py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Principais serviços</Eyebrow>
              <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                Do conserto à consultoria
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Uma só equipe para cuidar do computador da sua casa e da infraestrutura da sua empresa.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicos.map((s, i) => (
              <BlurFade key={s.titulo} delay={0.08 * i} inView>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.imagem}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-medium">{s.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{s.resumo}</p>
                  </div>
                </article>
              </BlurFade>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-dg-paper py-20 md:py-28">
        <Container>
          <Eyebrow>Manutenção</Eyebrow>
          <h2 className="mt-4 mb-12 max-w-3xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
            O que acontece na bancada
          </h2>
          <ManutencaoTabs />
        </Container>
      </section>

      <section className="dark bg-background py-20 text-foreground md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Direto do estoque</Eyebrow>
              <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
                PC Gamer pronto para levar
              </h2>
              <SincroniaErp catalogo={catalogo} className="mt-5" />
            </div>
            <Link href="/loja" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 self-start px-4 md:self-auto")}>
              Ver a loja completa
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <Eyebrow>Por que a DG</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
              Você cuida do negócio, a gente cuida das máquinas
            </h2>
            <Link href="/sobre" className="mt-8 inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline">
              Conheça a DG Computer
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {diferenciais.map((d) => (
              <div key={d.titulo} className="flex flex-col gap-3 bg-background p-7">
                <dt className="flex items-center gap-3 font-display text-lg font-medium">
                  <span aria-hidden="true" className="led h-4 w-1.5" />
                  {d.titulo}
                </dt>
                <dd className="text-muted-foreground">{d.texto}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaAtendimento />
    </>
  )
}
