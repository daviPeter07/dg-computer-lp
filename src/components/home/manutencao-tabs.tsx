"use client"

import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { manutencoes } from "@/lib/site"

export function ManutencaoTabs() {
  return (
    <Tabs defaultValue={manutencoes[0].titulo} orientation="vertical" className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
      <TabsList variant="line" className="w-full items-stretch gap-0 p-0">
        {manutencoes.map((m) => (
          <TabsTrigger
            key={m.titulo}
            value={m.titulo}
            className="h-auto flex-col items-start gap-2 rounded-none border-0 border-b border-border px-0 py-5 text-left whitespace-normal after:hidden data-active:text-foreground"
          >
            <span className="flex items-center gap-3 font-display text-xl font-medium sm:text-2xl">
              <span aria-hidden="true" className="h-5 w-1.5 rounded-full bg-border transition-colors [[data-active]_&]:bg-dg-orange" />
              {m.titulo}
            </span>
            <span className="pl-[1.125rem] text-base font-normal text-muted-foreground">{m.texto}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {manutencoes.map((m) => (
        <TabsContent key={m.titulo} value={m.titulo} className="relative min-h-72 overflow-hidden rounded-2xl md:min-h-0">
          <Image
            src={m.imagem}
            alt={m.titulo}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover animate-in fade-in-0 zoom-in-[1.02] duration-500"
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
