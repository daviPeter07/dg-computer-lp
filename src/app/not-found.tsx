import Link from "next/link"

import { DgMark } from "@/components/brand/dg-mark"
import { Container } from "@/components/layout/section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <section className="dark bg-background text-foreground">
      <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
        <DgMark className="h-24 w-auto text-white/30" />
        <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">Página não encontrada</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          O endereço pode ter mudado ou o produto saiu do catálogo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "h-11 bg-dg-orange px-5 text-dg-ink hover:bg-dg-orange/85")}>
            Voltar ao início
          </Link>
          <Link href="/loja" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}>
            Ver a loja
          </Link>
        </div>
      </Container>
    </section>
  )
}
