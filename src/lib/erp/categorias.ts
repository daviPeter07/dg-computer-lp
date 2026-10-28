import type { Categoria, CategoriaId } from "./types"

export const categorias: Categoria[] = [
  {
    id: "pc-gamer",
    nome: "PC Gamer",
    descricao: "Máquinas montadas e testadas na bancada, prontas para jogar.",
  },
  {
    id: "pecas",
    nome: "Peças e upgrades",
    descricao: "Memória, fonte, placa de vídeo e o que mais seu PC precisar.",
  },
  {
    id: "armazenamento",
    nome: "Armazenamento",
    descricao: "SSDs e HDs para dar velocidade e espaço ao seu computador.",
  },
  {
    id: "perifericos",
    nome: "Periféricos",
    descricao: "Teclados, mouses, headsets e monitores.",
  },
  {
    id: "redes",
    nome: "Redes",
    descricao: "Roteadores, switches e cabeamento para casa e empresa.",
  },
]

export function nomeCategoria(id: CategoriaId) {
  return categorias.find((c) => c.id === id)?.nome ?? id
}
