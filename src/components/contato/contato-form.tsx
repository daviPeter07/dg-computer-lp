"use client"

import { useState } from "react"

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { whatsappLink } from "@/lib/site"

const assuntos = [
  { value: "manutencao", label: "Manutenção ou conserto" },
  { value: "suporte", label: "Suporte de TI para empresa" },
  { value: "pc-gamer", label: "PC Gamer" },
  { value: "produto", label: "Produto da loja" },
  { value: "design", label: "Design gráfico ou site" },
  { value: "outro", label: "Outro assunto" },
]

/** Monta a mensagem e abre o WhatsApp da DG Computer; nada é enviado a servidor. */
export function ContatoForm() {
  const [assunto, setAssunto] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const dados = new FormData(event.currentTarget)
    const nome = String(dados.get("nome") ?? "").trim()
    const mensagem = String(dados.get("mensagem") ?? "").trim()

    if (!nome || !mensagem) {
      setErro("Preencha seu nome e a mensagem para continuar.")
      return
    }
    setErro(null)

    const rotulo = assuntos.find((a) => a.value === assunto)?.label
    const bairro = String(dados.get("bairro") ?? "").trim()
    const texto = [
      `Olá, DG Computer! Meu nome é ${nome}.`,
      ...(rotulo ? [`Assunto: ${rotulo}`] : []),
      ...(bairro ? [`Bairro: ${bairro}`] : []),
      "",
      mensagem,
    ].join("\n")

    window.open(whatsappLink(texto), "_blank", "noopener,noreferrer")
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" name="nome" autoComplete="name" required className="h-11 bg-background" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bairro">Bairro (opcional)</Label>
          <Input id="bairro" name="bairro" autoComplete="address-level3" className="h-11 bg-background" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label id="assunto-label">Assunto</Label>
        <Select items={assuntos} value={assunto} onValueChange={(v) => setAssunto(v as string | null)}>
          <SelectTrigger aria-labelledby="assunto-label" className="w-full bg-background data-[size=default]:h-11">
            <SelectValue placeholder="Escolha um assunto" />
          </SelectTrigger>
          <SelectContent>
            {assuntos.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          placeholder="Ex.: meu notebook não liga desde ontem"
          className="bg-background"
        />
      </div>

      {erro && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {erro}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="h-12 bg-dg-ink px-6 text-base text-white hover:bg-dg-ink/85">
          <WhatsAppIcon data-icon="inline-start" />
          Enviar pelo WhatsApp
        </Button>
        <p className="text-sm text-muted-foreground">A mensagem abre pronta no seu WhatsApp.</p>
      </div>
    </form>
  )
}
