import type { Catalogo } from "@/lib/erp/types"
import { cn } from "@/lib/utils"

const hora = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Manaus",
})

/** Linha de status mostrando de onde vêm os dados e quando foram sincronizados. */
export function SincroniaErp({ catalogo, className }: { catalogo: Catalogo; className?: string }) {
  const demo = catalogo.origem === "demo"
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground", className)}>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className={cn("h-3 w-1.5 rounded-full", demo ? "bg-muted-foreground/50" : "bg-dg-orange")} />
        {demo ? "Dados de demonstração · ERP ainda não conectado" : "Estoque sincronizado com o ERP"}
      </span>
      <span>Atualizado em {hora.format(new Date(catalogo.sincronizadoEm))}</span>
    </p>
  )
}
