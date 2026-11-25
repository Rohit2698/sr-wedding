import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FloatingActions, Footer, Navbar, ScrollProgress } from "@/components/wedding/Chrome";
import { Couple, Hero, IntroOverlay, Invitation } from "@/components/wedding/SectionsA";
import { Closing, Countdown, Events, Gallery, Venue } from "@/components/wedding/SectionsB";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumiran & Rohit — Wedding Invitation · 11 Dec 2026, Bikaner" },
      {
        name: "description",
        content:
          "Two Hearts. One Celebration. Join Sumiran Narayan & Rohit Thakur for their wedding in Sarita Sadan, B-41, Gandhi Colony, Pawanpuri, Bikaner, Rajasthan on 11 December 2026.",
      },
      { property: "og:title", content: "Sumiran & Rohit — The Grand Indian Wedding" },
      {
        property: "og:description",
        content:
          "Come celebrate our beautiful beginning — 11 December 2026, Sarita Sadan, B-41, Gandhi Colony, Pawanpuri, Bikaner, Rajasthan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [intro, setIntro] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
  }, [intro]);
  const close = (withMusic: boolean) => {
    setIntro(false);
    if (withMusic) setMusicOn(true);
    window.scrollTo({ top: 0 });
  };
  return (
    <main>
      <IntroOverlay open={intro} onOpen={() => close(true)} onSkip={() => close(false)} />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Invitation />

      <Events />
      <Countdown />

      {/* <Venue /> */}
      <Closing />
      <Footer />
      <FloatingActions musicOn={musicOn} setMusicOn={setMusicOn} />
    </main>
  );
}
