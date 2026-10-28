"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { DgMark } from "@/components/brand/dg-mark"
import { Container, Eyebrow } from "@/components/layout/section"
import SplitText from "@/components/react-bits/SplitText"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { buttonVariants } from "@/components/ui/button"
import { contato } from "@/lib/site"
import { cn } from "@/lib/utils"

const statusBancada = [
  { rotulo: "Atendimento", valor: "Seg a sáb · 8h às 18h" },
  { rotulo: "Endereço", valor: "Rua Apurinã, 56 · Centro" },
  { rotulo: "A domicílio", valor: "Sim, em Manaus" },
]

export function Hero() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background text-foreground">
      <AnimatedGridPattern
        numSquares={24}
        maxOpacity={0.12}
        duration={4}
        className="-z-10 fill-dg-orange/30 stroke-white/[0.06] [mask-image:radial-gradient(900px_circle_at_75%_40%,white,transparent)]"
      />
      <Container className="grid items-center gap-14 pt-16 pb-20 md:pt-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:pb-28">
        <div className="flex flex-col gap-7">
          <Eyebrow>Assistência técnica no Centro de Manaus</Eyebrow>
          <SplitText
            tag="h1"
            text="Computador parado é prejuízo."
            splitType="words"
            delay={70}
            duration={0.9}
            textAlign="left"
            rootMargin="0px"
            trigger="load"
            className="font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight sm:text-6xl xl:text-7xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">
            Manutenção de PCs e notebooks, suporte de TI para empresas, redes e PC Gamer montado na bancada. A DG
            Computer coloca a sua máquina de volta ao trabalho.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/loja"
              className={cn(buttonVariants({ size: "lg" }), "h-12 bg-dg-orange px-5 text-base text-dg-ink hover:bg-dg-orange/85")}
            >
              Ver produtos em estoque
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link
              href="#servicos"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-5 text-base")}
            >
              Conhecer os serviços
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-8 lg:max-w-none">
          <DgMark animated className="h-56 w-auto text-white sm:h-72 lg:h-80" />
          <dl className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-card/70 font-mono text-xs backdrop-blur">
            {statusBancada.map((item) => (
              <div key={item.rotulo} className="flex items-center justify-between gap-4 px-4 py-3">
                <dt className="text-muted-foreground">{item.rotulo}</dt>
                <dd className="text-right">{item.valor}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <dt className="text-muted-foreground">Telefone</dt>
              <dd>
                <a href={contato.telefoneHref} className="text-dg-orange hover:underline">
                  {contato.telefone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
}
