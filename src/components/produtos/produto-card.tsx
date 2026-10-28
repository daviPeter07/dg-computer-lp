import Link from "next/link"

import { nomeCategoria } from "@/lib/erp/categorias"
import { formatarPreco, precoAtual, rotuloEstoque, statusEstoque, type StatusEstoque } from "@/lib/erp/format"
import type { Produto } from "@/lib/erp/types"
import { cn } from "@/lib/utils"

import { ProdutoImagem } from "./produto-imagem"

export function EstoqueStatus({ status, className }: { status: StatusEstoque; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-wide uppercase", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-3 w-1.5 rounded-full",
          status === "disponivel" && "bg-dg-orange shadow-[0_0_10px_var(--dg-orange)]",
          status === "ultimas" && "animate-pulse bg-dg-orange",
          status === "esgotado" && "bg-muted-foreground/40"
        )}
      />
      {rotuloEstoque[status]}
    </span>
  )
}

export function ProdutoCard({ produto, className }: { produto: Produto; className?: string }) {
  const status = statusEstoque(produto)
  const promo = produto.precoPromocional !== undefined

  return (
    <Link
      href={`/loja/${produto.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dg-orange/70 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
        className
      )}
    >
      <ProdutoImagem produto={produto} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            {nomeCategoria(produto.categoria)}
          </span>
          <EstoqueStatus status={status} />
        </div>
        <h3 className="font-sans text-base leading-snug font-semibold">{produto.nome}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-display text-xl font-medium">{formatarPreco(precoAtual(produto))}</span>
          {promo && (
            <span className="text-sm text-muted-foreground line-through">{formatarPreco(produto.preco)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
