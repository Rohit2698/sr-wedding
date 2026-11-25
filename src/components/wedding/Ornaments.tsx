import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {[90, 72, 54, 36, 18].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
        {petals.map((_, i) => (
          <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
            <path d="M100 10 C112 30 112 45 100 58 C88 45 88 30 100 10Z" />
            <path d="M100 46 C106 56 106 64 100 72 C94 64 94 56 100 46Z" />
            <circle cx="100" cy="24" r="2" fill="currentColor" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Marigold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="20" cy="9" rx="5" ry="9" fill="var(--marigold)" transform={`rotate(${i * 30} 20 20)`} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={`b${i}`} cx="20" cy="13" rx="3.5" ry="6" fill="var(--haldi)" transform={`rotate(${i * 36 + 15} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" fill="var(--sindoor)" />
    </svg>
  );
}

/** Hanging marigold garland strands (toran). */
export function Toran({ strands = 14, className = "" }: { strands?: number; className?: string }) {
  return (
    <div className={`pointer-events-none flex justify-between ${className}`} aria-hidden>
      {Array.from({ length: strands }).map((_, i) => (
        <div key={i} className="flex animate-sway flex-col items-center" style={{ animationDelay: `${i * 0.25}s` }}>
          {Array.from({ length: 3 + (i % 3) }).map((__, j) => (
            <Marigold key={j} className={`-mt-1 size-5 sm:size-7 ${j % 2 ? "opacity-90" : ""}`} />
          ))}
          <span className="mt-0.5 size-2 rounded-full bg-rani" />
        </div>
      ))}
    </div>
  );
}

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gold sm:w-24" />
      <span className="size-1.5 rotate-45 bg-rani" />
      <Marigold className="size-6" />
      <span className="size-1.5 rotate-45 bg-rani" />
      <span className="h-px w-16 bg-gold sm:w-24" />
    </div>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <div className={`relative grid place-items-center rounded-full ${className}`}>
      <Mandala className="absolute inset-0 size-full text-gold opacity-70" />
      <span className="relative font-script text-[2.2em] leading-none text-magenta">
        S<span className="mx-0.5 text-[0.6em] text-gold">&</span>R
      </span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub, tone = "default" }: { eyebrow?: string; title: string; sub?: string; tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && <p className={`font-script text-3xl ${light ? "text-haldi" : "text-rani"}`}>{eyebrow}</p>}
      <h2 className={`mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl ${light ? "text-ivory" : "text-magenta"}`}>{title}</h2>
      <FloralDivider className="mt-5" />
      {sub && <p className={`mt-5 font-serif text-xl ${light ? "text-ivory/85" : "text-muted-foreground"}`}>{sub}</p>}
    </Reveal>
  );
}

export function Petals({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`absolute top-0 block animate-petal rounded-[60%_0] ${i % 3 === 0 ? "bg-marigold" : i % 3 === 1 ? "bg-rani" : "bg-haldi"}`}
          style={{
            left: `${(i * 37) % 100}%`,
            width: 10 + (i % 4) * 3,
            height: 10 + (i % 4) * 3,
            animationDuration: `${9 + (i % 5) * 2}s`,
            animationDelay: `${(i * 1.3) % 9}s`,
          }}
        />
      ))}
    </div>
  );
}
