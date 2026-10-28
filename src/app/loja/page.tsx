import type { Metadata } from "next"
import { Suspense } from "react"
import { InfoIcon } from "lucide-react"

import { Container, PageHero } from "@/components/layout/section"
import { LojaCatalogo } from "@/components/produtos/loja-catalogo"
import { ProdutoCard } from "@/components/produtos/produto-card"
import { SincroniaErp } from "@/components/produtos/sincronia-erp"
import { getCatalogo } from "@/lib/erp/client"

export const metadata: Metadata = {
  title: "Loja",
  description: "Consulte preços e disponibilidade dos produtos da DG Computer. Compra e reserva pelo WhatsApp ou na loja.",
}

export default async function LojaPage() {
  const catalogo = await getCatalogo()

  return (
    <>
      <PageHero eyebrow="Loja online" titulo="Consulte antes de vir até a loja">
        <p>Veja preço e disponibilidade de cada produto. Para comprar ou reservar, é só chamar no WhatsApp.</p>
        <SincroniaErp catalogo={catalogo} className="mt-6" />
      </PageHero>

      <div className="border-b border-border bg-dg-paper">
        <Container className="flex items-start gap-3 py-4 text-sm">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-dg-orange-deep" />
          <p>
            Esta loja é só para consulta: não há carrinho nem pagamento pelo site. A venda é feita no balcão ou pelo
            WhatsApp.
          </p>
        </Container>
      </div>

      <section className="py-14 md:py-20">
        <Container>
          {/* A busca e a categoria ficam na URL, por isso o catálogo lê searchParams dentro de Suspense. */}
          <Suspense
            fallback={
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:pl-[17.5rem]">
                {catalogo.produtos.slice(0, 6).map((p) => (
                  <ProdutoCard key={p.id} produto={p} />
                ))}
              </div>
            }
          >
            <LojaCatalogo produtos={catalogo.produtos} />
          </Suspense>
        </Container>
      </section>
    </>
  )
}
