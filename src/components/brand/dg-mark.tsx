import { cn } from "@/lib/utils"

interface DgMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Anima o traço do g e "liga" a cápsula laranja, como um LED de energia. */
  animated?: boolean
}

// Símbolo da DG Computer redesenhado em vetor a partir da logo original.
export function DgMark({ animated = false, className, ...props }: DgMarkProps) {
  return (
    <svg
      viewBox="28 0 68 116"
      fill="none"
      aria-hidden="true"
      className={cn("text-current", className)}
      {...props}
    >
      <rect
        x="76.5"
        y="4"
        width="11"
        height="29"
        rx="5.5"
        fill="var(--dg-orange)"
        className={animated ? "[animation:led-boot_900ms_ease-out_1.2s_both]" : undefined}
      />
      <circle
        cx="62"
        cy="58"
        r="22.5"
        stroke="currentColor"
        strokeWidth="11"
        strokeDasharray={animated ? 142 : undefined}
        style={animated ? ({ "--len": 142 } as React.CSSProperties) : undefined}
        className={animated ? "[animation:draw-stroke_900ms_cubic-bezier(.65,0,.35,1)_both]" : undefined}
        transform="rotate(-90 62 58)"
      />
      <path
        d="M39.99 90.68 A22.5 22.5 0 0 0 84.01 90.68"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={animated ? 62 : undefined}
        style={animated ? ({ "--len": 62 } as React.CSSProperties) : undefined}
        className={animated ? "[animation:draw-stroke_600ms_cubic-bezier(.65,0,.35,1)_700ms_both]" : undefined}
      />
    </svg>
  )
}

export function DgLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DgMark className="h-8 w-auto" />
      <span className="font-display text-[1.05rem] leading-none font-medium tracking-tight lowercase">
        dg computer
      </span>
    </span>
  )
}
