import { PhoneIcon } from "lucide-react"

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { contato, whatsappLink } from "@/lib/site"

import { Container } from "./section"

export function CtaAtendimento({
  titulo = "Seu computador deu problema?",
  texto = "Fale com a gente e agende uma visita. Atendemos na loja, no Centro de Manaus, ou na sua casa ou empresa.",
}: {
  titulo?: string
  texto?: string
}) {
  return (
    <section className="bg-dg-orange text-dg-ink">
      <Container className="flex flex-col items-start gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-[1.05] font-medium tracking-tight sm:text-5xl">{titulo}</h2>
          <p className="mt-4 text-lg text-dg-ink/80">{texto}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <ShimmerButton
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            background="var(--dg-ink)"
            shimmerColor="#f69323"
            className="h-12 px-6 text-base font-medium focus-visible:ring-3 focus-visible:ring-dg-ink focus-visible:ring-offset-2 focus-visible:ring-offset-dg-orange focus-visible:outline-none"
          >
            <WhatsAppIcon className="mr-2 size-5" />
            Chamar no WhatsApp
          </ShimmerButton>
          <a
            href={contato.telefoneHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-dg-ink px-6 font-medium transition-colors hover:bg-dg-ink hover:text-white focus-visible:ring-3 focus-visible:ring-dg-ink focus-visible:outline-none"
          >
            <PhoneIcon className="size-4" />
            {contato.telefone}
          </a>
        </div>
      </Container>
    </section>
  )
}
