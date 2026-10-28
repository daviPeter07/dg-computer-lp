import { cn } from "@/lib/utils"

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
}

/** Rótulo de seção com o LED laranja da marca. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase", className)}>
      <span className="led h-3.5 w-1.5" aria-hidden="true" />
      {children}
    </p>
  )
}

interface PageHeroProps {
  eyebrow: string
  titulo: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/** Cabeçalho das páginas internas. */
export function PageHero({ eyebrow, titulo, children, className }: PageHeroProps) {
  return (
    <section className={cn("dark relative overflow-hidden bg-background text-foreground", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <Container className="relative flex flex-col gap-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl">
          {titulo}
        </h1>
        {children && <div className="max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </Container>
    </section>
  )
}
