import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Menu, Music, Pause, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { weddingData as w } from "@/config/weddingData";
import { whatsappShareUrl } from "@/lib/wedding-utils";
import { Monogram } from "./Ornaments";

const links = [
  ["Invitation", "invitation"],
  ["Events", "events"],
  ["Gallery", "gallery"],
  ["Venue", "venue"],
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-festive"
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 80);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-1 z-30 transition-all ${scrolled ? "bg-ivory/90 shadow-card backdrop-blur" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <a href="#home" aria-label="Home">
          <Monogram
            className={`size-12 text-[0.7rem] ${scrolled ? "" : "rounded-full bg-ivory/90"}`}
          />
        </a>
        <ul className="hidden gap-6 lg:flex">
          {links.map(([l, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm tracking-wide transition-colors hover:text-rani ${scrolled ? "text-foreground" : "text-ivory"}`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button
          aria-label="Menu"
          onClick={() => setOpen(true)}
          className={`grid size-11 place-items-center rounded-full lg:hidden ${scrolled ? "text-magenta" : "bg-ivory/90 text-magenta"}`}
        >
          <Menu />
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 paper lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid size-11 place-items-center text-magenta"
          >
            <X />
          </button>
          {links.map(([l, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-bold text-magenta"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export function FloatingActions({
  musicOn,
  setMusicOn,
}: {
  musicOn: boolean;
  setMusicOn: (v: boolean) => void;
}) {
  const [showTop, setShowTop] = useState(false);
  const [url, setUrl] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    setUrl(window.location.origin + window.location.pathname);
    const f = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!w.musicSrc) return;
    if (!audio.current) {
      audio.current = new Audio(w.musicSrc);
      audio.current.loop = true;
      audio.current.volume = 0.5;
    }
    if (musicOn) audio.current.play().catch(() => setMusicOn(false));
    else audio.current.pause();
  }, [musicOn, setMusicOn]);

  const btn =
    "grid size-12 place-items-center rounded-full shadow-card transition hover:-translate-y-0.5";
  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-3">
      {w.musicSrc && (
        <button
          aria-label={musicOn ? "Pause music" : "Play music"}
          onClick={() => setMusicOn(!musicOn)}
          className={`${btn} bg-ivory text-magenta ring-2 ring-gold`}
        >
          {musicOn ? <Pause className="size-5" /> : <Music className="size-5" />}
        </button>
      )}
      <a
        aria-label="Share on WhatsApp"
        href={whatsappShareUrl(url)}
        target="_blank"
        rel="noreferrer"
        className={`${btn} bg-peacock text-ivory`}
      >
        <Share2 className="size-5" />
      </a>
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${btn} bg-festive text-primary-foreground`}
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-burgundy px-4 py-10 text-center text-ivory/80">
      <Monogram className="mx-auto size-16 rounded-full bg-ivory text-[0.6rem]" />
      <p className="mt-3 font-serif text-lg">{w.tagline}</p>
      <p className="mt-1 text-xs tracking-[0.3em]">
        {w.weddingDateLabel.toUpperCase()} · {w.city.toUpperCase()}
      </p>
    </footer>
  );
}
