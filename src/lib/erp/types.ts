// Modelo de produto usado pelo site. O adaptador em ./client.ts converte
// o formato do ERP para este modelo, então as páginas não dependem do ERP.

export type CategoriaId = "pc-gamer" | "pecas" | "armazenamento" | "perifericos" | "redes"

export interface Categoria {
  id: CategoriaId
  nome: string
  descricao: string
}

export interface Especificacao {
  rotulo: string
  valor: string
}

export interface Produto {
  id: string
  sku: string
  slug: string
  nome: string
  marca?: string
  categoria: CategoriaId
  /** Preço em centavos. */
  preco: number
  /** Preço promocional em centavos, quando houver. */
  precoPromocional?: number
  /** Quantidade disponível no estoque do ERP. */
  estoque: number
  imagens: string[]
  descricao: string
  especificacoes: Especificacao[]
  destaque?: boolean
  atualizadoEm: string
}

export interface Catalogo {
  produtos: Produto[]
  /** "erp" quando os dados vieram da API; "demo" quando são os dados de exemplo. */
  origem: "erp" | "demo"
  sincronizadoEm: string
}
