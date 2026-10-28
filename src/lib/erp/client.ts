import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { produtosDemo } from "./demo"
import type { Catalogo, CategoriaId, Produto } from "./types"

/** Tag usada pelo webhook do ERP (/api/estoque/revalidar) para atualizar o catálogo. */
export const TAG_CATALOGO = "erp-catalogo"

/**
 * Formato esperado da API do ERP. Ajuste os campos aqui e em `mapearProduto`
 * conforme a documentação do ERP usado pela DG Computer.
 */
interface ProdutoErp {
  id: string | number
  codigo: string
  descricao: string
  descricao_longa?: string
  marca?: string
  grupo: string
  preco_venda: number
  preco_promocional?: number | null
  saldo_estoque: number
  imagens?: string[]
  atributos?: { nome: string; valor: string }[]
  destaque?: boolean
  atualizado_em: string
}

const gruposParaCategoria: Record<string, CategoriaId> = {
  "PC GAMER": "pc-gamer",
  PECAS: "pecas",
  ARMAZENAMENTO: "armazenamento",
  PERIFERICOS: "perifericos",
  REDES: "redes",
}

function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function mapearProduto(p: ProdutoErp): Produto {
  return {
    id: String(p.id),
    sku: p.codigo,
    slug: `${slugify(p.descricao)}-${slugify(p.codigo)}`,
    nome: p.descricao,
    marca: p.marca,
    categoria: gruposParaCategoria[p.grupo.toUpperCase()] ?? "pecas",
    preco: Math.round(p.preco_venda * 100),
    precoPromocional: p.preco_promocional ? Math.round(p.preco_promocional * 100) : undefined,
    estoque: Math.max(0, Math.floor(p.saldo_estoque)),
    imagens: p.imagens ?? [],
    descricao: p.descricao_longa ?? "",
    especificacoes: (p.atributos ?? []).map((a) => ({ rotulo: a.nome, valor: a.valor })),
    destaque: p.destaque,
    atualizadoEm: p.atualizado_em,
  }
}

async function buscarDoErp(url: string): Promise<Produto[]> {
  const resposta = await fetch(`${url.replace(/\/$/, "")}/produtos?ativos=true`, {
    headers: {
      Accept: "application/json",
      ...(process.env.ERP_API_TOKEN ? { Authorization: `Bearer ${process.env.ERP_API_TOKEN}` } : {}),
    },
  })
  if (!resposta.ok) {
    throw new Error(`ERP respondeu ${resposta.status} ao listar produtos`)
  }
  const dados = (await resposta.json()) as ProdutoErp[] | { data: ProdutoErp[] }
  const lista = Array.isArray(dados) ? dados : dados.data
  return lista.map(mapearProduto)
}

/**
 * Catálogo completo. Fica em cache por minutos e é invalidado na hora
 * quando o ERP chama o webhook de estoque.
 */
export async function getCatalogo(): Promise<Catalogo> {
  "use cache"
  cacheLife("minutes")
  cacheTag(TAG_CATALOGO)

  const url = process.env.ERP_API_URL
  if (!url) {
    return { produtos: produtosDemo, origem: "demo", sincronizadoEm: new Date().toISOString() }
  }
  return { produtos: await buscarDoErp(url), origem: "erp", sincronizadoEm: new Date().toISOString() }
}

export async function getProduto(slug: string) {
  const { produtos } = await getCatalogo()
  return produtos.find((p) => p.slug === slug) ?? null
}
