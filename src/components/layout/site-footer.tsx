import Link from "next/link"

import { DgMark } from "@/components/brand/dg-mark"
import { contato, navegacao, servicos } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <DgMark className="h-14 w-auto" />
            <span className="font-display text-2xl leading-none lowercase">dg computer</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Manutenção, suporte de TI, consultoria e PC Gamer no Centro de Manaus. Atendemos também a domicílio.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">Páginas</h2>
          <ul className="grid gap-2 text-sm">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-dg-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">Serviços</h2>
          <ul className="grid gap-2 text-sm">
            {servicos.map((s) => (
              <li key={s.titulo}>{s.titulo}</li>
            ))}
            <li>Design gráfico</li>
            <li>Criação de sites</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">Atendimento</h2>
          <address className="grid gap-2 text-sm not-italic">
            <span>{contato.endereco}</span>
            <span>
              CEP {contato.cep} · {contato.cidade}
            </span>
            <a href={contato.telefoneHref} className="hover:text-dg-orange">
              {contato.telefone}
            </a>
            <a href={`mailto:${contato.email}`} className="hover:text-dg-orange">
              {contato.email}
            </a>
            <span className="text-muted-foreground">{contato.horario}</span>
          </address>
          <ul className="mt-5 flex gap-4 text-sm">
            <li>
              <a href={contato.redes.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-dg-orange">
                Instagram
              </a>
            </li>
            <li>
              <a href={contato.redes.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-dg-orange">
                Facebook
              </a>
            </li>
            <li>
              <a href={contato.redes.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-dg-orange">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 font-mono text-xs text-muted-foreground sm:px-6 lg:px-8">
          DG Computer · Manaus - AM · Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
