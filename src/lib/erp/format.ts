import type { Produto } from "./types"

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

export function formatarPreco(centavos: number) {
  return moeda.format(centavos / 100)
}

export function precoAtual(produto: Produto) {
  return produto.precoPromocional ?? produto.preco
}

export type StatusEstoque = "disponivel" | "ultimas" | "esgotado"

export function statusEstoque(produto: Produto): StatusEstoque {
  if (produto.estoque <= 0) return "esgotado"
  if (produto.estoque <= 3) return "ultimas"
  return "disponivel"
}

export const rotuloEstoque: Record<StatusEstoque, string> = {
  disponivel: "Em estoque",
  ultimas: "Últimas unidades",
  esgotado: "Esgotado",
}
