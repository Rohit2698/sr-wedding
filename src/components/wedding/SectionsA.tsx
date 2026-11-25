import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Gem, Heart, Map, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { weddingData as w } from "@/config/weddingData";
import {
  FloralDivider,
  Mandala,
  Monogram,
  Petals,
  Reveal,
  SectionHeading,
  Toran,
} from "./Ornaments";

export function pill(variant: "festive" | "outline" | "ivory" = "festive") {
  const styles = {
    festive: "bg-festive text-primary-foreground shadow-card hover:brightness-110",
    outline: "border-2 border-gold text-foreground hover:bg-gold/15",
    ivory: "bg-ivory text-magenta hover:bg-champagne",
  }[variant];
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 ${styles}`;
}

export function IntroOverlay({
  open,
  onOpen,
  onSkip,
}: {
  open: boolean;
  onOpen: () => void;
  onSkip: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden paper px-4"
          exit={{ opacity: 0, transition: { duration: 0.9, delay: 0.5 } }}
        >
          <Toran className="absolute inset-x-2 top-0" strands={12} />
          <Mandala className="absolute -left-32 -bottom-32 size-96 animate-spin-slow text-rani/25" />
          <Mandala className="absolute -right-32 -top-20 size-96 animate-spin-slow text-marigold/30" />
          <Petals count={10} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ rotateX: 75, y: -80, opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            style={{ transformPerspective: 1200 }}
            className="relative w-full max-w-md arch border-4 border-gold bg-card px-6 pb-10 pt-16 text-center shadow-card sm:px-10"
          >
            <div
              className="pointer-events-none absolute inset-3 arch border border-rani/40"
              aria-hidden
            />
            <Monogram className="mx-auto -mt-4 size-20 text-[0.9rem]" />
            <p className="mt-4 font-serif text-xl font-semibold text-sindoor">|| शुभ विवाह ||</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-wide text-magenta sm:text-4xl">
              {w.bride.fullName.toUpperCase()}
            </h1>
            <p className="my-1 font-script text-4xl text-gold">&</p>
            <h1 className="font-display text-3xl font-bold tracking-wide text-magenta sm:text-4xl">
              {w.groom.fullName.toUpperCase()}
            </h1>
            <FloralDivider className="my-5" />
            <p className="text-sm font-semibold tracking-[0.3em] text-foreground">
              {w.weddingDateLabel.toUpperCase()}
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground">
              {`${w.city}, ${w.state}`.toUpperCase()}
            </p>
            <p className="mt-5 font-serif text-lg italic text-foreground/80">
              "Together with our families, we invite you to celebrate our special day."
            </p>
            <button onClick={onOpen} className={`${pill()} mt-7 px-8`}>
              OPEN INVITATION
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <img
        src={w.heroImage}
        alt="Rajasthani palace courtyard decorated with marigolds"
        width={1600}
        height={1008}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-magenta/45 to-burgundy/80" />
      <Toran className="absolute inset-x-2 top-0 z-10" strands={16} />
      <Petals />
      <div className="relative z-10 px-4 pt-24 pb-20 text-center text-ivory">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-xl italic sm:text-2xl"
        >
          Together with our families
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 font-display text-6xl font-extrabold leading-none tracking-tight sm:text-8xl lg:text-9xl"
        >
          {w.bride.firstName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-script text-6xl text-haldi sm:text-7xl"
        >
          &
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-display text-6xl font-extrabold leading-none tracking-tight sm:text-8xl lg:text-9xl"
        >
          {w.groom.firstName}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <p className="mt-6 text-sm font-semibold tracking-[0.45em] text-haldi sm:text-base">
            ARE GETTING MARRIED!
          </p>
          <div className="mx-auto mt-6 inline-flex flex-col items-center gap-1 rounded-full border border-haldi/60 bg-burgundy/30 px-8 py-3 backdrop-blur-sm">
            <span className="font-display text-lg tracking-[0.2em]">
              {w.weddingDateLabel.toUpperCase()}
            </span>
            <span className="text-xs tracking-[0.35em] text-ivory/80">
              {`${w.city}, ${w.state}`.toUpperCase()}
            </span>
          </div>
          <p className="mt-8 font-script text-3xl text-haldi sm:text-4xl">
            Ek Nayi Shuruaat, Dher Saari Khushiyan!
          </p>
        </motion.div>
      </div>
      <a
        href="#invitation"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ivory/90"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="grid size-10 place-items-center rounded-full border border-haldi/70"
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </a>
    </section>
  );
}

export function Invitation() {
  return (
    <section id="invitation" className="relative overflow-hidden paper px-4 py-24">
      <Mandala className="absolute -left-40 top-10 size-[28rem] animate-spin-slow text-rani/15" />
      <Mandala className="absolute -right-40 bottom-0 size-[28rem] animate-spin-slow text-marigold/20" />
      <Reveal className="relative mx-auto max-w-3xl">
        <div className="ornate-frame rounded-3xl bg-card/90 px-6 py-14 text-center shadow-card sm:px-14">
          <Monogram className="mx-auto size-20 text-[0.9rem]" />
          <p className="mt-4 font-script text-4xl text-rani">With Love & Blessings</p>
          <FloralDivider className="my-6" />
          <div className="space-y-4 font-serif text-xl leading-relaxed text-foreground/85 sm:text-2xl">
            <p>
              With the blessings of our families and the love of our dear ones, we joyfully invite
              you to celebrate the wedding of {w.bride.firstName} and {w.groom.firstName}.
            </p>
            <p>Your presence and blessings will make our special moments even more beautiful.</p>
            <p>Join us as we begin our journey of love, happiness, and togetherness.</p>
          </div>
          <h3 className="mt-10 font-display text-3xl font-bold text-magenta sm:text-4xl">
            {w.bride.fullName.toUpperCase()}
          </h3>
          <p className="font-script text-4xl text-gold">&</p>
          <h3 className="font-display text-3xl font-bold text-magenta sm:text-4xl">
            {w.groom.fullName.toUpperCase()}
          </h3>
          <FloralDivider className="my-6" />
          <p className="font-semibold tracking-[0.3em]">{w.weddingDateLabel.toUpperCase()}</p>
          <p className="mt-1 text-sm tracking-[0.3em] text-muted-foreground">
            {`${w.city}, ${w.state}, ${w.country}`.toUpperCase()}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Portrait({
  name,
  role,
  photo,
  delay,
}: {
  name: string;
  role: string;
  photo: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center">
      <div className="relative w-64 sm:w-72">
        <div className="absolute -inset-3 arch bg-gold opacity-90" />
        <div className="absolute -inset-1.5 arch bg-ivory" />
        <div className="relative aspect-[3/4] overflow-hidden arch bg-gradient-to-b from-blush to-champagne">
          {photo ? (
            <img src={photo} alt={name} loading="lazy" className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center text-rani/40">
              <Mandala className="absolute size-56 animate-spin-slow text-gold/30" />
              <UserRound className="size-20" strokeWidth={1} />
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 font-script text-3xl text-rani">{role}</p>
      <h3 className="font-display text-2xl font-bold tracking-wide text-magenta">
        {name.toUpperCase()}
      </h3>
    </Reveal>
  );
}

export function Couple() {
  const fam = [w.families.bride, w.families.groom];
  return (
    <section id="couple" className="relative bg-blush/40 px-4 py-24">
      <SectionHeading eyebrow="Meet the Couple" title="The Beautiful Beginning of Forever" />
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-10 md:flex-row md:gap-6">
        <Portrait name={w.bride.fullName} role="The Bride" photo={w.bride.photo} delay={0} />
        <Reveal delay={0.2}>
          <span className="font-script text-8xl text-gold md:text-9xl">&</span>
        </Reveal>
        <Portrait name={w.groom.fullName} role="The Groom" photo={w.groom.photo} delay={0.3} />
      </div>
      <Reveal className="mx-auto mt-20 max-w-3xl text-center">
        <p className="font-display text-2xl font-semibold text-magenta">
          Two Families, One Beautiful Bond
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fam.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gold/50 bg-card px-6 py-5">
              <p className="font-serif text-xl font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {f.parents || "Family details coming soon"}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const storyIcons = { sparkles: Sparkles, message: MessageCircle, map: Map, gem: Gem, heart: Heart };
const storyColors = ["bg-marigold", "bg-rani", "bg-peacock", "bg-magenta", "bg-sindoor"];

export function LoveStory() {
  return (
    <section id="story" className="relative overflow-hidden paper px-4 py-24">
      <SectionHeading eyebrow="Our Love Story" title="Every Love Story Is Beautiful" />
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-festive md:left-1/2 md:-translate-x-1/2" />
        {w.loveStory.map((s, i) => {
          const Icon = storyIcons[s.icon as keyof typeof storyIcons];
          const left = i % 2 === 0;
          return (
            <Reveal
              key={s.title}
              delay={0.05 * i}
              className={`relative mb-12 flex md:w-1/2 ${left ? "md:pr-14" : "md:ml-auto md:pl-14"} pl-20 md:pl-0`}
            >
              <span
                className={`absolute left-0 top-2 grid size-12 place-items-center rounded-full text-primary-foreground ring-4 ring-ivory ${storyColors[i]} ${left ? "md:left-auto md:-right-6" : "md:-left-6"}`}
              >
                <Icon className="size-5" />
              </span>
              <div
                className={`w-full rounded-2xl border border-gold/40 bg-card p-6 shadow-card ${left ? "md:text-right" : ""}`}
              >
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">CHAPTER {i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-magenta">{s.title}</h3>
                <p className="mt-2 font-serif text-lg text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
