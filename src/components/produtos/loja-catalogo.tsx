"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, XIcon } from "lucide-react"

import CountUp from "@/components/react-bits/CountUp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categorias } from "@/lib/erp/categorias"
import { precoAtual, statusEstoque } from "@/lib/erp/format"
import type { CategoriaId, Produto } from "@/lib/erp/types"
import { cn } from "@/lib/utils"

import { ProdutoCard } from "./produto-card"

const ordenacoes = [
  { value: "relevancia", label: "Destaques primeiro" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "Nome (A–Z)" },
]

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

export function LojaCatalogo({ produtos }: { produtos: Produto[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoriaInicial = searchParams.get("categoria")
  const [categoria, setCategoria] = useState<CategoriaId | null>(
    categorias.some((c) => c.id === categoriaInicial) ? (categoriaInicial as CategoriaId) : null
  )
  const [busca, setBusca] = useState(searchParams.get("q") ?? "")
  const [ordem, setOrdem] = useState<string>("relevancia")
  const [soDisponiveis, setSoDisponiveis] = useState(false)

  function escolherCategoria(id: CategoriaId | null) {
    setCategoria(id)
    const params = new URLSearchParams(searchParams.toString())
    if (id) params.set("categoria", id)
    else params.delete("categoria")
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const visiveis = useMemo(() => {
    const termo = normalizar(busca.trim())
    const lista = produtos.filter((p) => {
      if (categoria && p.categoria !== categoria) return false
      if (soDisponiveis && statusEstoque(p) === "esgotado") return false
      if (termo && !normalizar(`${p.nome} ${p.marca ?? ""} ${p.sku}`).includes(termo)) return false
      return true
    })
    return lista.sort((a, b) => {
      switch (ordem) {
        case "menor-preco":
          return precoAtual(a) - precoAtual(b)
        case "maior-preco":
          return precoAtual(b) - precoAtual(a)
        case "nome":
          return a.nome.localeCompare(b.nome, "pt-BR")
        default:
          return Number(Boolean(b.destaque)) - Number(Boolean(a.destaque))
      }
    })
  }, [produtos, categoria, busca, ordem, soDisponiveis])

  const emEstoque = produtos.filter((p) => statusEstoque(p) !== "esgotado").length
  const filtrando = Boolean(categoria || busca || soDisponiveis)

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl bg-dg-ink p-5 text-white">
          <p className="font-mono text-xs tracking-wider text-white/60 uppercase">Itens disponíveis</p>
          <p className="mt-1 font-display text-4xl font-medium text-dg-orange">
            <CountUp to={emEstoque} duration={1.2} trigger="load" />
          </p>
          <p className="mt-1 text-sm text-white/60">de {produtos.length} produtos cadastrados</p>
        </div>

        <div>
          <h2 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Categorias</h2>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {[{ id: null, nome: "Todas" } as const, ...categorias].map((c) => {
              const atual = categoria === c.id
              const total = c.id ? produtos.filter((p) => p.categoria === c.id).length : produtos.length
              return (
                <li key={c.id ?? "todas"}>
                  <button
                    type="button"
                    onClick={() => escolherCategoria(c.id)}
                    aria-pressed={atual}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-full border px-4 py-1.5 text-sm transition-colors lg:rounded-lg lg:border-transparent lg:px-3 lg:py-2",
                      atual
                        ? "border-dg-ink bg-dg-ink text-white"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className={cn("hidden h-3.5 w-1.5 rounded-full lg:inline-block", atual ? "bg-dg-orange" : "bg-transparent")} />
                      {c.nome}
                    </span>
                    <span className="font-mono text-xs opacity-60">{total}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={soDisponiveis}
            onChange={(e) => setSoDisponiveis(e.target.checked)}
            className="size-4 accent-[var(--dg-orange)]"
          />
          Mostrar só o que tem em estoque
        </label>
      </aside>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, marca ou código"
              aria-label="Buscar produtos"
              className="h-11 pl-10"
            />
          </div>
          <Select items={ordenacoes} value={ordem} onValueChange={(v) => setOrdem((v as string) ?? "relevancia")}>
            <SelectTrigger aria-label="Ordenar produtos" className="w-full data-[size=default]:h-11 sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ordenacoes.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {visiveis.length === 1 ? "1 produto encontrado" : `${visiveis.length} produtos encontrados`}
        </p>

        {visiveis.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visiveis.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border p-10">
            <p className="font-display text-xl">Nenhum produto com esses filtros</p>
            <p className="text-muted-foreground">Tente outra busca ou veja todas as categorias.</p>
            {filtrando && (
              <Button
                variant="outline"
                onClick={() => {
                  setBusca("")
                  setSoDisponiveis(false)
                  escolherCategoria(null)
                }}
              >
                <XIcon data-icon="inline-start" />
                Limpar filtros
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
