import type { Metadata } from "next"
import Link from "next/link"

import { CtaAtendimento } from "@/components/layout/cta-atendimento"
import { Container, PageHero } from "@/components/layout/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { contato } from "@/lib/site"

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Horários, atendimento a domicílio, orçamento, PC Gamer e como funciona a loja online da DG Computer.",
}

const grupos = [
  {
    titulo: "Atendimento",
    perguntas: [
      {
        p: "Qual é o horário de atendimento?",
        r: `${contato.horario}. Você também pode mandar mensagem pelo WhatsApp ${contato.telefone} a qualquer hora e respondemos assim que possível.`,
      },
      {
        p: "Vocês atendem a domicílio?",
        r: "Sim. Atendemos em casas e empresas de Manaus. Chame no WhatsApp para agendar uma visita.",
      },
      {
        p: "Onde fica a loja?",
        r: `${contato.endereco}, ${contato.cidade}, CEP ${contato.cep}.`,
      },
    ],
  },
  {
    titulo: "Manutenção e suporte",
    perguntas: [
      {
        p: "Como funciona o orçamento?",
        r: "Primeiro fazemos o diagnóstico do equipamento. Depois passamos o orçamento com o que precisa ser feito, e o serviço só começa com a sua aprovação.",
      },
      {
        p: "Qual a diferença entre manutenção preventiva e corretiva?",
        r: "A preventiva é feita antes do problema aparecer: limpeza, troca de pasta térmica e revisão. A corretiva é o conserto depois que o computador já apresentou defeito.",
      },
      {
        p: "Vale a pena trocar o HD por SSD?",
        r: "Na maioria dos casos, sim. É o upgrade que mais muda o dia a dia: o computador liga e abre programas muito mais rápido. Avaliamos se a sua máquina é compatível.",
      },
      {
        p: "Vocês fazem suporte de TI para empresas?",
        r: "Sim. Configuramos e gerenciamos computadores e redes ethernet e wireless, e oferecemos consultoria para planejar a TI da empresa.",
      },
    ],
  },
  {
    titulo: "Loja e produtos",
    perguntas: [
      {
        p: "Posso comprar pelo site?",
        r: "Ainda não. A loja online serve para consultar produtos, preços e disponibilidade. Para comprar ou reservar, chame no WhatsApp ou venha até a loja.",
      },
      {
        p: "O estoque mostrado no site é atualizado?",
        r: "Sim. Os produtos vêm direto do sistema de estoque da DG Computer e são atualizados automaticamente. Mesmo assim, confirme a disponibilidade no WhatsApp antes de vir buscar.",
      },
      {
        p: "Vocês montam PC Gamer com a configuração que eu quiser?",
        r: "Sim. Além das configurações prontas da loja, montamos a máquina de acordo com os jogos e o orçamento que você tem.",
      },
      {
        p: "Os produtos têm garantia?",
        r: "Sim. O prazo varia conforme o produto ou serviço e é informado no momento da compra ou do orçamento.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Perguntas frequentes" titulo="Tire suas dúvidas">
        <p>
          Não achou o que procurava?{" "}
          <Link href="/contato" className="text-dg-orange underline-offset-4 hover:underline">
            Fale com a gente
          </Link>
          .
        </p>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14">
          {grupos.map((g) => (
            <div key={g.titulo} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-12">
              <h2 className="flex items-center gap-3 self-start text-xl font-medium lg:sticky lg:top-24">
                <span aria-hidden="true" className="led h-5 w-1.5" />
                {g.titulo}
              </h2>
              <Accordion className="border-t border-border">
                {g.perguntas.map((q) => (
                  <AccordionItem key={q.p} value={q.p} className="border-b border-border">
                    <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline sm:text-lg">
                      {q.p}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-base text-muted-foreground">{q.r}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </Container>
      </section>

      <CtaAtendimento titulo="Ainda com dúvida?" texto="Mande sua pergunta no WhatsApp ou ligue para a loja." />
    </>
  )
}
