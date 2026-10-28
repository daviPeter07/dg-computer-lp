import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, StoreIcon } from "lucide-react"

import { Container } from "@/components/layout/section"
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { EstoqueStatus, ProdutoCard } from "@/components/produtos/produto-card"
import { ProdutoImagem } from "@/components/produtos/produto-imagem"
import { SincroniaErp } from "@/components/produtos/sincronia-erp"
import { BorderBeam } from "@/components/ui/border-beam"
import { buttonVariants } from "@/components/ui/button"
import { getCatalogo, getProduto } from "@/lib/erp/client"
import { nomeCategoria } from "@/lib/erp/categorias"
import { formatarPreco, precoAtual, statusEstoque } from "@/lib/erp/format"
import { contato, whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const { produtos } = await getCatalogo()
  return produtos.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/loja/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const produto = await getProduto(slug)
  if (!produto) return { title: "Produto não encontrado" }
  return {
    title: produto.nome,
    description: produto.descricao || `${produto.nome} na DG Computer, em Manaus.`,
    openGraph: produto.imagens[0] ? { images: [produto.imagens[0]] } : undefined,
  }
}

export default async function ProdutoPage({ params }: PageProps<"/loja/[slug]">) {
  const { slug } = await params
  const [produto, catalogo] = await Promise.all([getProduto(slug), getCatalogo()])
  if (!produto) notFound()

  const status = statusEstoque(produto)
  const relacionados = catalogo.produtos
    .filter((p) => p.categoria === produto.categoria && p.id !== produto.id)
    .slice(0, 4)
  const mensagem = `Olá! Vi no site o produto ${produto.nome} (código ${produto.sku}). Ainda está disponível?`

  return (
    <>
      <section className="py-10 md:py-16">
        <Container>
          <nav aria-label="Caminho" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/loja" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <ArrowLeftIcon className="size-4" />
              Loja
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/loja?categoria=${produto.categoria}`} className="hover:text-foreground">
              {nomeCategoria(produto.categoria)}
            </Link>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative self-start overflow-hidden rounded-3xl">
              <ProdutoImagem produto={produto} sizes="(min-width: 1024px) 50vw, 100vw" preload />
              {status !== "esgotado" && <BorderBeam size={180} duration={9} colorFrom="#f69323" colorTo="#ffffff" borderWidth={2} />}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <EstoqueStatus status={status} />
                <span className="font-mono text-xs text-muted-foreground">Cód. {produto.sku}</span>
                {produto.marca && <span className="font-mono text-xs text-muted-foreground">{produto.marca}</span>}
              </div>
              <h1 className="text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{produto.nome}</h1>
              {produto.descricao && <p className="text-lg text-muted-foreground">{produto.descricao}</p>}

              <div className="flex flex-wrap items-baseline gap-3 border-y border-border py-5">
                <span className="font-display text-4xl font-medium">{formatarPreco(precoAtual(produto))}</span>
                {produto.precoPromocional !== undefined && (
                  <span className="text-lg text-muted-foreground line-through">{formatarPreco(produto.preco)}</span>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "lg" }), "h-12 bg-dg-orange px-6 text-base text-dg-ink hover:bg-dg-orange/85")}
                >
                  <WhatsAppIcon data-icon="inline-start" />
                  {status === "esgotado" ? "Avise-me quando chegar" : "Consultar no WhatsApp"}
                </a>
                <Link href="/contato" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-6 text-base")}>
                  <StoreIcon data-icon="inline-start" />
                  Como chegar na loja
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Loja só para consulta. Reserve pelo WhatsApp {contato.telefone} ou compre no balcão, na {contato.endereco}.
              </p>

              {produto.especificacoes.length > 0 && (
                <div>
                  <h2 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Especificações</h2>
                  <dl className="divide-y divide-border rounded-2xl border border-border">
                    {produto.especificacoes.map((e) => (
                      <div key={e.rotulo} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-5 py-3 text-sm">
                        <dt className="text-muted-foreground">{e.rotulo}</dt>
                        <dd className="font-medium">{e.valor}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <SincroniaErp catalogo={catalogo} />
            </div>
          </div>
        </Container>
      </section>

      {relacionados.length > 0 && (
        <section className="border-t border-border bg-dg-paper py-16">
          <Container>
            <h2 className="mb-8 text-2xl font-medium sm:text-3xl">Mais em {nomeCategoria(produto.categoria)}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relacionados.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
