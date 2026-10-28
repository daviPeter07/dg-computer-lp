"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { DgLogo } from "@/components/brand/dg-mark"
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { buttonVariants } from "@/components/ui/button"
import { navegacao, whatsappLink } from "@/lib/site"
import { cn } from "@/lib/utils"

function ativo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="dark sticky top-0 z-50 border-b border-border bg-background/85 text-foreground backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="DG Computer, página inicial" className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none">
          <DgLogo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => {
              const atual = ativo(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={atual ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
                      atual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {atual && <span className="led h-3.5 w-1.5" aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden bg-dg-orange px-4 text-dg-ink hover:bg-dg-orange/85 sm:inline-flex"
            )}
          >
            <WhatsAppIcon data-icon="inline-start" />
            Chamar no WhatsApp
          </a>

          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "lg:hidden")}
              aria-label="Abrir menu"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="dark w-[85vw] max-w-sm border-border bg-background text-foreground">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col gap-8 p-6">
                <DgLogo />
                <nav aria-label="Principal (celular)">
                  <ul className="flex flex-col">
                    {navegacao.map((item) => {
                      const atual = ativo(pathname, item.href)
                      return (
                        <li key={item.href} className="border-b border-border">
                          <Link
                            href={item.href}
                            aria-current={atual ? "page" : undefined}
                            className="flex items-center gap-3 py-4 font-display text-lg"
                          >
                            <span className={cn("led h-4 w-1.5", !atual && "opacity-0")} aria-hidden="true" />
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "lg" }), "mt-auto h-12 bg-dg-orange text-base text-dg-ink hover:bg-dg-orange/85")}
                >
                  <WhatsAppIcon data-icon="inline-start" />
                  Chamar no WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
