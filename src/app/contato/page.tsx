import type { Metadata } from "next"
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { ContatoForm } from "@/components/contato/contato-form"
import { Container, PageHero } from "@/components/layout/section"
import { contato } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a DG Computer: ${contato.telefone}, ${contato.email}. ${contato.endereco}, ${contato.cidade}.`,
}

const canais = [
  { icone: PhoneIcon, rotulo: "Telefone e WhatsApp", valor: contato.telefone, href: contato.telefoneHref },
  { icone: MailIcon, rotulo: "E-mail", valor: contato.email, href: `mailto:${contato.email}` },
  { icone: MapPinIcon, rotulo: "Endereço", valor: `${contato.endereco} · CEP ${contato.cep} · ${contato.cidade}` },
  { icone: ClockIcon, rotulo: "Horário", valor: contato.horario },
]

export default function ContatoPage() {
  return (
    <>
      <PageHero eyebrow="Contato" titulo="Fale com a DG Computer">
        <p>Agende uma visita, peça um orçamento ou tire uma dúvida. Atendemos na loja e a domicílio.</p>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <ul className="grid gap-6">
              {canais.map(({ icone: Icone, rotulo, valor, href }) => (
                <li key={rotulo} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-dg-ink text-dg-orange">
                    <Icone className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{rotulo}</p>
                    {href ? (
                      <a href={href} className="text-lg font-medium hover:text-dg-orange-deep">
                        {valor}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{valor}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Mapa com a localização da DG Computer"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contato.mapsQuery)}&output=embed`}
                className="aspect-[4/3] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-dg-paper p-6 sm:p-10">
            <h2 className="text-2xl font-medium sm:text-3xl">Mande uma mensagem</h2>
            <p className="mt-2 mb-8 text-muted-foreground">Preencha e a conversa abre no WhatsApp com tudo já escrito.</p>
            <ContatoForm />
          </div>
        </Container>
      </section>
    </>
  )
}
