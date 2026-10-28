import Image from "next/image"
import { CableIcon, CpuIcon, HardDriveIcon, KeyboardIcon, MonitorIcon } from "lucide-react"

import { DgMark } from "@/components/brand/dg-mark"
import type { CategoriaId, Produto } from "@/lib/erp/types"
import { cn } from "@/lib/utils"

const iconePorCategoria: Record<CategoriaId, React.ComponentType<{ className?: string }>> = {
  "pc-gamer": MonitorIcon,
  pecas: CpuIcon,
  armazenamento: HardDriveIcon,
  perifericos: KeyboardIcon,
  redes: CableIcon,
}

interface ProdutoImagemProps {
  produto: Produto
  sizes: string
  className?: string
  preload?: boolean
}

/** Foto do produto vinda do ERP; sem foto, mostra uma etiqueta com o SKU. */
export function ProdutoImagem({ produto, sizes, className, preload }: ProdutoImagemProps) {
  const foto = produto.imagens[0]
  const Icone = iconePorCategoria[produto.categoria]

  return (
    <div className={cn("relative aspect-square overflow-hidden bg-dg-graphite", className)}>
      {foto ? (
        <Image
          src={foto}
          alt={produto.nome}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <DgMark className="relative h-7 w-auto self-end text-white/80" />
          <Icone className="relative size-16 stroke-[1.25] text-dg-orange transition-transform duration-500 group-hover:-translate-y-1" />
          <span className="relative font-mono text-[0.7rem] tracking-wider text-white/55">{produto.sku}</span>
        </div>
      )}
    </div>
  )
}
