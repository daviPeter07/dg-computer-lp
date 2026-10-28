import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { CtaAtendimento } from "@/components/layout/cta-atendimento"
import { Container, Eyebrow, PageHero } from "@/components/layout/section"
import { ProdutoCard } from "@/components/produtos/produto-card"
import { SincroniaErp } from "@/components/produtos/sincronia-erp"
import { getCatalogo } from "@/lib/erp/client"
import { categorias } from "@/lib/erp/categorias"

export const metadata: Metadata = {
  title: "Produtos",
  description: "PC Gamer, peças, armazenamento, periféricos e redes com estoque atualizado direto do sistema da DG Computer.",
}

export default async function ProdutosPage() {
  const catalogo = await getCatalogo()
  const porCategoria = categorias
    .map((c) => ({ ...c, produtos: catalogo.produtos.filter((p) => p.categoria === c.id) }))
    .filter((c) => c.produtos.length > 0)

  return (
    <>
      <PageHero eyebrow="Produtos" titulo="O que temos na prateleira">
        <p>
          Os produtos desta página vêm direto do sistema de estoque da DG Computer. Preço e disponibilidade são
          atualizados automaticamente.
        </p>
        <SincroniaErp catalogo={catalogo} className="mt-6" />
      </PageHero>

      <nav aria-label="Categorias" className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {porCategoria.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-dg-ink hover:bg-dg-ink hover:text-white"
            >
              {c.nome}
              <span className="ml-2 font-mono text-xs opacity-60">{c.produtos.length}</span>
            </a>
          ))}
        </Container>
      </nav>

      <div className="py-16 md:py-20">
        {porCategoria.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-32 py-10">
            <Container>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Eyebrow>{c.nome}</Eyebrow>
                  <p className="mt-3 max-w-xl text-lg text-muted-foreground">{c.descricao}</p>
                </div>
                <Link
                  href={`/loja?categoria=${c.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                >
                  Ver na loja
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {c.produtos.slice(0, 4).map((p) => (
                  <ProdutoCard key={p.id} produto={p} />
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CtaAtendimento
        titulo="Não achou a peça?"
        texto="Mande o modelo pelo WhatsApp e a gente verifica a disponibilidade para você."
      />
    </>
  )
}
