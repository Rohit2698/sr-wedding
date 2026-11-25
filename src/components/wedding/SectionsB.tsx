import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Car, ChevronLeft, ChevronRight, Clock, Hotel, Loader2, MapPin, Navigation, Shirt, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { weddingData as w, type EventTheme, type WeddingEvent } from "@/config/weddingData";
import { formatEventDate, formatTime, googleCalendarUrl, mapsUrl, useCountdown } from "@/lib/wedding-utils";
import { EVENT_OPTIONS, RsvpNotConfiguredError, rsvpSchema, submitRsvp, type RsvpInput } from "@/services/rsvpService";
import { FloralDivider, Mandala, Marigold, Monogram, Petals, Reveal, SectionHeading, Toran } from "./Ornaments";
import { pill } from "./SectionsA";

const themes: Record<EventTheme, { section: string; title: string; accent: string; chip: string; mandala: string }> = {
  haldi: { section: "bg-haldi/35", title: "text-sindoor", accent: "text-marigold", chip: "bg-marigold text-primary-foreground", mandala: "text-marigold/30" },
  mehendi: { section: "bg-emerald text-ivory", title: "text-haldi", accent: "text-blush", chip: "bg-rani text-primary-foreground", mandala: "text-gold/30" },
  sangeet: { section: "bg-magenta text-ivory", title: "text-haldi", accent: "text-blush", chip: "bg-gold text-burgundy", mandala: "text-rani/50" },
  wedding: { section: "bg-sindoor text-ivory", title: "text-haldi", accent: "text-blush", chip: "bg-gold text-burgundy", mandala: "text-gold/30" },
  reception: { section: "bg-champagne", title: "text-burgundy", accent: "text-rani", chip: "bg-burgundy text-ivory", mandala: "text-gold/40" },
};

function EventMeta({ e, light }: { e: WeddingEvent; light: boolean }) {
  const time = e.startTime ? `${formatTime(e.startTime)}${e.endTime ? ` – ${formatTime(e.endTime)}` : ""}` : "Time to be announced";
  const rows = [
    { Icon: CalendarPlus, label: formatEventDate(e.date) },
    { Icon: Clock, label: time },
    { Icon: MapPin, label: e.venue || "Venue to be announced" },
    { Icon: Shirt, label: `Dress code: ${e.dressCode}` },
  ];
  return (
    <ul className={`mt-6 space-y-3 text-sm sm:text-base ${light ? "text-ivory/90" : "text-foreground/80"}`}>
      {rows.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-3"><Icon className="size-4 shrink-0 text-gold" />{label}</li>
      ))}
    </ul>
  );
}

function EventActions({ e }: { e: WeddingEvent }) {
  const cal = googleCalendarUrl(e, `${w.bride.firstName} & ${w.groom.firstName}`);
  const dir = mapsUrl([e.venue, e.address].filter(Boolean).join(", "));
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {dir ? <a href={dir} target="_blank" rel="noreferrer" className={pill("ivory")}><Navigation className="size-4" />Directions</a>
        : <button disabled className={pill("ivory")}><Navigation className="size-4" />Directions soon</button>}
      {cal ? <a href={cal} target="_blank" rel="noreferrer" className={pill("festive")}><CalendarPlus className="size-4" />Add to Calendar</a>
        : <button disabled title="Available once date and time are set" className={pill("festive")}><CalendarPlus className="size-4" />Calendar soon</button>}
    </div>
  );
}

function EventBlock({ e, index }: { e: WeddingEvent; index: number }) {
  const t = themes[e.theme];
  const light = ["mehendi", "sangeet", "wedding"].includes(e.theme);
  const flip = index % 2 === 1;

  if (e.theme === "wedding") {
    return (
      <article id={`event-${e.id}`} className={`relative overflow-hidden px-4 py-24 ${t.section}`}>
        <Toran className="absolute inset-x-2 top-0" strands={18} />
        <Petals count={10} />
        <div className="relative mx-auto max-w-6xl text-center">
          <Reveal>
            <span className="font-display text-7xl font-extrabold text-gold/70">{e.number}</span>
            <p className="font-script text-4xl text-haldi">{e.tagline}</p>
            <h3 className="mt-2 font-display text-5xl font-extrabold tracking-wide sm:text-7xl">{e.name.toUpperCase()}</h3>
            <p className="mt-3 font-display text-2xl tracking-[0.2em] text-haldi">{w.bride.firstName.toUpperCase()} & {w.groom.firstName.toUpperCase()}</p>
            <p className="mt-1 tracking-[0.35em]">{w.weddingDateLabel.toUpperCase()}</p>
          </Reveal>
          <Reveal delay={0.2} className="relative mx-auto mt-12 max-w-5xl">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gold" />
            <div className="absolute -inset-1.5 rounded-[2.2rem] bg-sindoor" />
            <img src={e.image} alt="Wedding mandap with sacred fire" loading="lazy" width={1600} height={1008} className="relative aspect-[16/10] w-full rounded-[2rem] object-cover" />
          </Reveal>
          <Reveal delay={0.3} className="mx-auto mt-12 grid max-w-4xl items-start gap-8 text-left md:grid-cols-2">
            <p className="font-serif text-2xl italic leading-relaxed">"{e.description}"</p>
            <div><EventMeta e={e} light /><EventActions e={e} /></div>
          </Reveal>
        </div>
      </article>
    );
  }

  return (
    <article id={`event-${e.id}`} className={`relative overflow-hidden px-4 py-20 ${t.section}`}>
      <Mandala className={`absolute ${flip ? "-left-40" : "-right-40"} top-1/2 size-[30rem] -translate-y-1/2 animate-spin-slow ${t.mandala}`} />
      <div className={`relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal className="relative">
          <div className="group relative overflow-hidden arch border-4 border-gold shadow-card">
            <img src={e.image} alt={`${e.name} decor`} loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.3 }}
            className={`absolute -bottom-5 ${flip ? "-left-2" : "-right-2"} grid size-24 place-items-center rounded-full font-display text-3xl font-extrabold shadow-card ${t.chip}`}
          >{e.number}</motion.span>
        </Reveal>
        <Reveal delay={0.15}>
          <p className={`text-xs font-semibold tracking-[0.4em] ${t.accent}`}>EVENT {e.number}</p>
          <h3 className={`mt-2 font-display text-4xl font-extrabold sm:text-5xl ${t.title}`}>{e.name}</h3>
          <p className={`mt-2 font-script text-3xl ${t.accent}`}>{e.tagline}</p>
          <p className={`mt-5 font-serif text-xl leading-relaxed ${light ? "text-ivory/90" : "text-foreground/85"}`}>{e.description}</p>
          <EventMeta e={e} light={light} />
          <EventActions e={e} />
        </Reveal>
      </div>
    </article>
  );
}

export function Events() {
  return (
    <section id="events">
      <div className="paper px-4 pt-24 pb-4">
        <SectionHeading eyebrow="Join the Festivities" title="The Wedding Celebrations" sub="Five beautiful days of colour, music, rituals and love." />
      </div>
      {w.events.map((e, i) => <EventBlock key={e.id} e={e} index={i} />)}
    </section>
  );
}

export function Countdown() {
  const r = useCountdown(w.weddingDateISO);
  const units = r ? [["Days", r.days], ["Hours", r.hours], ["Minutes", r.minutes], ["Seconds", r.seconds]] as const : [];
  return (
    <section id="countdown" className="relative overflow-hidden bg-blush/50 px-4 py-24">
      <Marigold className="absolute left-6 top-10 size-16 animate-spin-slow opacity-70" />
      <Marigold className="absolute right-8 bottom-10 size-20 animate-spin-slow opacity-70" />
      {r?.done ? (
        <SectionHeading eyebrow="Let the beautiful memories last forever." title="The Celebrations Have Begun!" />
      ) : (
        <>
          <SectionHeading eyebrow="The Big Day Is Almost Here!" title="Countdown to Our Forever" />
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-6">
            {(r ? units : (["Days", "Hours", "Minutes", "Seconds"].map((l) => [l, 0]) as unknown as typeof units)).map(([label, v], i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-6">
                <div className="w-[4.6rem] rounded-2xl border-2 border-gold bg-card py-4 text-center shadow-card sm:w-36 sm:py-6">
                  <span className="block font-display text-3xl font-extrabold tabular-nums text-magenta sm:text-6xl">{r ? String(v).padStart(2, "0") : "--"}</span>
                  <span className="mt-1 block text-[10px] font-semibold tracking-[0.25em] text-muted-foreground sm:text-xs">{label.toUpperCase()}</span>
                </div>
                {i < 3 && <span className="hidden size-2 rotate-45 bg-gold sm:block" />}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const categories = ["All", "Our Moments", "Pre-Wedding", "Celebrations", "Family & Friends"] as const;

export function Gallery() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const items = w.gallery.filter((g) => cat === "All" || g.category === cat);
  const go = (d: number) => setIdx((i) => (i === null ? null : (i + d + items.length) % items.length));

  useEffect(() => {
    if (idx === null) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setIdx(null);
      if (ev.key === "ArrowRight") go(1);
      if (ev.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section id="gallery" className="paper px-4 py-24">
      <SectionHeading eyebrow="Gallery" title="Little Moments, Big Memories" sub="Celebrating love, laughter, and togetherness." />
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm transition-colors ${cat === c ? "bg-festive text-primary-foreground" : "border border-gold/60 hover:bg-gold/10"}`}>{c}</button>
        ))}
      </div>
      <div className="mx-auto max-w-6xl columns-2 gap-4 md:columns-3">
        {items.length === 0 && <p className="text-center text-muted-foreground">Photos coming soon.</p>}
        {items.map((g, i) => (
          <motion.button layout key={g.src + g.alt} onClick={() => setIdx(i)} className="group relative mb-4 block w-full overflow-hidden rounded-2xl border-4 border-ivory shadow-card ring-2 ring-gold/50">
            <img src={g.src} alt={g.alt} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${g.tall ? "aspect-[3/4]" : "aspect-square"}`} />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy/80 to-transparent p-3 text-left text-xs text-ivory opacity-0 transition-opacity group-hover:opacity-100">{g.alt}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {idx !== null && items[idx] && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-burgundy/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}>
            <motion.img
              key={idx} src={items[idx].src} alt={items[idx].alt}
              drag="x" dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
              onClick={(ev) => ev.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-h-[80vh] max-w-full rounded-2xl border-4 border-gold object-contain"
            />
            <button aria-label="Close" onClick={() => setIdx(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-ivory text-magenta"><X /></button>
            <button aria-label="Previous" onClick={(ev) => { ev.stopPropagation(); go(-1); }} className="absolute left-3 grid size-11 place-items-center rounded-full bg-ivory text-magenta"><ChevronLeft /></button>
            <button aria-label="Next" onClick={(ev) => { ev.stopPropagation(); go(1); }} className="absolute right-3 grid size-11 place-items-center rounded-full bg-ivory text-magenta"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Venue() {
  const v = w.venue;
  const dir = v.mapsUrl || mapsUrl(v.address);
  const info = [
    { Icon: MapPin, title: "Venue", text: v.name ? `${v.name}${v.address ? ` — ${v.address}` : ""}` : "Venue details will be shared soon." },
    { Icon: Car, title: "Parking", text: v.parking || "Parking information coming soon." },
    { Icon: Hotel, title: "Accommodation", text: v.accommodation || "Accommodation details coming soon." },
  ];
  return (
    <section id="venue" className="relative overflow-hidden px-4 py-24">
      <img src={w.cityImage} alt="Sandstone palace in Bikaner" loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy/90" />
      <div className="relative">
        <SectionHeading tone="light" eyebrow="Venue & Location" title="Meet Us in the Beautiful City of Bikaner" sub={`${w.city}, ${w.state}, ${w.country}`.toUpperCase()} />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {info.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} className="rounded-3xl border border-gold/60 bg-ivory/95 p-7 text-center shadow-card">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-festive text-primary-foreground"><Icon className="size-6" /></span>
              <h3 className="mt-4 font-display text-xl font-bold text-magenta">{title}</h3>
              <p className="mt-2 font-serif text-lg text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          {dir ? <a href={dir} target="_blank" rel="noreferrer" className={pill()}><Navigation className="size-4" />Get Directions</a>
            : <button disabled className={pill("ivory")}><Navigation className="size-4" />Directions once venue is confirmed</button>}
        </div>
      </div>
    </section>
  );
}

const field = "w-full rounded-xl border border-input bg-card px-4 py-3 text-base outline-none transition focus:border-rani focus:ring-2 focus:ring-rani/25";

export function Rsvp() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1, events: [] },
  });
  const attending = watch("attending");

  const onSubmit = async (data: RsvpInput) => {
    setError(null);
    try { await submitRsvp(data); setStatus("success"); }
    catch (e) { setError(e instanceof RsvpNotConfiguredError || e instanceof Error ? e.message : "Something went wrong."); }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-blush/40 px-4 py-24">
      <Mandala className="absolute -right-40 -top-40 size-[30rem] animate-spin-slow text-rani/15" />
      <SectionHeading eyebrow="RSVP" title="We Would Love to Celebrate With You!" sub="Your presence is the most precious gift. Please let us know if you can join our celebrations." />
      <Reveal className="relative mx-auto max-w-2xl">
        <div className="ornate-frame rounded-3xl bg-ivory p-6 shadow-card sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-10 text-center">
                <Monogram className="mx-auto size-24 text-[1rem]" />
                <h3 className="mt-6 font-display text-3xl font-bold text-magenta">Yay! Thank You for Celebrating With Us!</h3>
                <p className="mt-2 font-script text-3xl text-rani">We can't wait to see you!</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
                <label className="grid gap-1.5 text-sm font-medium">Full Name *
                  <input className={field} {...register("fullName")} autoComplete="name" />
                  {errors.fullName && <span className="text-xs text-destructive">{errors.fullName.message}</span>}
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-medium">Email (optional)
                    <input type="email" className={field} {...register("email")} />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">Phone (optional)
                    <input type="tel" className={field} {...register("phone")} />
                    {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                  </label>
                </div>
                <fieldset className="grid gap-2">
                  <legend className="mb-1.5 text-sm font-medium">Will you attend? *</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {[["yes", "Joyfully attending"], ["no", "Sadly can't make it"]].map(([v, l]) => (
                      <label key={v} className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-center text-sm transition ${attending === v ? "border-rani bg-rani/10 text-magenta" : "border-input bg-card"}`}>
                        <input type="radio" value={v} className="sr-only" {...register("attending")} />{l}
                      </label>
                    ))}
                  </div>
                  {errors.attending && <span className="text-xs text-destructive">{errors.attending.message}</span>}
                </fieldset>
                {attending !== "no" && (
                  <>
                    <label className="grid gap-1.5 text-sm font-medium">Number of Guests *
                      <input type="number" min={1} max={20} className={field} {...register("guests")} />
                      {errors.guests && <span className="text-xs text-destructive">{errors.guests.message}</span>}
                    </label>
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium">Events attending</legend>
                      <div className="flex flex-wrap gap-2">
                        {EVENT_OPTIONS.map((ev) => (
                          <label key={ev} className="cursor-pointer has-[:checked]:border-rani has-[:checked]:bg-festive has-[:checked]:text-primary-foreground rounded-full border border-gold/60 bg-card px-4 py-2 text-sm transition">
                            <input type="checkbox" value={ev} className="sr-only" {...register("events")} />{ev}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="grid gap-1.5 text-sm font-medium">Dietary Preferences (optional)
                      <input className={field} {...register("dietary")} placeholder="Vegetarian, Jain, allergies…" />
                    </label>
                  </>
                )}
                <label className="grid gap-1.5 text-sm font-medium">Message for the Couple (optional)
                  <textarea rows={3} className={field} {...register("message")} />
                </label>
                {error && <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={isSubmitting} className={`${pill()} mt-2 w-full`}>
                  {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Sending…</> : "Send RSVP"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

export function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden bg-festive px-4 pb-16 pt-32 text-center text-primary-foreground">
      <Toran className="absolute inset-x-2 top-0" strands={16} />
      <Petals />
      <Mandala className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-ivory/15" />
      <Reveal className="relative mx-auto max-w-3xl">
        <div className="mx-auto size-32 rounded-full bg-ivory p-2 shadow-card"><Monogram className="size-full text-[1.3rem]" /></div>
        <h2 className="mt-8 font-display text-4xl font-extrabold leading-tight sm:text-6xl">Two Hearts. One Journey. Endless Memories.</h2>
        <p className="mt-5 font-serif text-2xl">We can't wait to celebrate this beautiful beginning with you.</p>
        <FloralDivider className="my-8 [&_span.h-px]:bg-ivory" />
        <p className="font-display text-2xl font-bold tracking-wide sm:text-3xl">{w.bride.fullName.toUpperCase()}</p>
        <p className="font-script text-5xl text-haldi">&</p>
        <p className="font-display text-2xl font-bold tracking-wide sm:text-3xl">{w.groom.fullName.toUpperCase()}</p>
        <p className="mt-6 tracking-[0.35em]">{w.weddingDateLabel.toUpperCase()}</p>
        <p className="text-sm tracking-[0.35em] opacity-90">{`${w.city}, ${w.state}`.toUpperCase()}</p>
        <p className="mt-10 font-script text-4xl text-haldi">With Love & Happiness</p>
      </Reveal>
    </section>
  );
}
