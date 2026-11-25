// Single source of truth for all invitation content. Edit values here only.
import hero from "@/assets/hero.jpg";
import haldi from "@/assets/haldi.jpg";
import mehendi from "@/assets/mehendi.jpg";
import sangeet from "@/assets/sangeet.jpg";
import wedding from "@/assets/wedding.jpg";
import reception from "@/assets/reception.jpg";
import bikaner from "@/assets/bikaner.jpg";
import details from "@/assets/details.jpg";

export type EventTheme = "haldi" | "mehendi" | "sangeet" | "wedding" | "reception";

export interface WeddingEvent {
  id: string;
  number: string;
  name: string;
  theme: EventTheme;
  tagline: string;
  description: string;
  /** ISO date "YYYY-MM-DD" or "" when not yet decided */
  date: string;
  /** "HH:mm" 24h in Asia/Kolkata, or "" */
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  dressCode: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: "Our Moments" | "Pre-Wedding" | "Celebrations" | "Family & Friends";
  tall?: boolean;
}

export const weddingData = {
  bride: { firstName: "Sumiran", fullName: "Sumiran Narayan", photo: "" },
  groom: { firstName: "Rohit", fullName: "Rohit Thakur", photo: "" },
  monogram: "S & R",
  weddingDateISO: "2026-12-11T00:00:00+05:30",
  weddingDateLabel: "11 December 2026",
  timezone: "Asia/Kolkata",
  city: "Sarita Sadan, B-41, Gandhi Colony, Pawanpuri, Bikaner",
  state: "Rajasthan",
  country: "India",
  tagline: "Two Hearts. One Celebration. A Lifetime of Togetherness.",
  secondaryTagline: "Come Celebrate Our Beautiful Beginning!",
  heroImage: hero,
  cityImage: bikaner,
  // Leave empty to hide; add names later.
  families: {
    bride: { title: "The Narayan Family", parents: "" },
    groom: { title: "The Thakur Family", parents: "" },
  },
  loveStory: [
    {
      title: "The First Meeting",
      icon: "sparkles",
      text: "Our story begins here — a moment to be written by the couple.",
    },
    {
      title: "The First Conversation",
      icon: "message",
      text: "The words that started it all — to be shared soon.",
    },
    {
      title: "The Beautiful Journey",
      icon: "map",
      text: "Adventures, laughter and growing together — details coming soon.",
    },
    {
      title: "The Proposal",
      icon: "gem",
      text: "The question, the answer, the happy tears — story to be added.",
    },
    {
      title: "Forever Begins",
      icon: "heart",
      text: "11 December 2026, Bikaner — and every day after.",
    },
  ],
  events: [
    {
      id: "mehendi",
      number: "01",
      name: "Mehendi Ceremony",
      theme: "mehendi",
      tagline: "Mehendi, Music & Memories!",
      description:
        "Beautiful henna, colorful outfits, floral decorations, music, and endless laughter! Let's celebrate the magic of traditions and togetherness.",
      date: "2026-12-08",
      startTime: "19:30",
      endTime: "22:30",
      venue: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      address: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      dressCode: "Traditional Indian / Ethnic",
      image: mehendi,
    },
    {
      id: "haldi",
      number: "02",
      name: "Haldi Ceremony",
      theme: "haldi",
      tagline: "Rang Barse, Haldi Ki Khushiyan!",
      description:
        "Let's begin the celebrations with sunshine, smiles, turmeric, and endless blessings! Join us for a joyful Haldi ceremony filled with laughter, flowers, and beautiful memories.",
      date: "2026-12-09",
      startTime: "11:00",
      endTime: "",
      venue: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      address: "",
      dressCode: "Yellow / Traditional Indian",
      image: haldi,
    },

    {
      id: "sangeet",
      number: "03",
      name: "Sangeet Night",
      theme: "sangeet",
      tagline: "Dance, Music & Celebration!",
      description:
        "Get ready for a night filled with music, dance, laughter, and unforgettable performances! Bring your dancing shoes and celebrate with us.",
      date: "2026-12-09",
      startTime: "11:30",
      endTime: "16:30",
      venue: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      address: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      dressCode: "Ethnic",
      image: sangeet,
    },
    {
      id: "jaggo",
      number: "04",
      name: "Jaggo",
      theme: "sangeet",
      tagline: "Jaggo, Music & Celebration!",
      description:
        "Get ready for a night filled with music, dance, laughter, and unforgettable performances! Bring your dancing shoes and celebrate with us.",
      date: "2026-12-09",
      startTime: "19:30",
      endTime: "12:30",
      venue: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      address: "#132 Jagat Niwas, Aarya gaming zone, Dattowal, Nalagarh",
      dressCode: "Ethnic",
      image: wedding,
    },
    {
      id: "wedding",
      number: "04",
      name: "The Wedding Ceremony",
      theme: "wedding",
      tagline: "Saat Phere, Forever Together!",
      description:
        "With the blessings of our families, under the sacred fire, and surrounded by the love of our dear ones, we promise to walk together for a lifetime.",
      date: "2026-12-11",
      startTime: "10:00",
      endTime: "",
      venue: "Sarita Sadan, B-41, Gandhi Colony, Pawanpuri, Bikaner",
      address: "Sarita Sadan, B-41, Gandhi Colony, Pawanpuri, Bikaner",
      dressCode: "Traditional Indian / Ethnic",
      image: wedding,
    },
    {
      id: "reception",
      number: "05",
      name: "Wedding Reception",
      theme: "reception",
      tagline: "An Evening of Love & Celebration!",
      description:
        "Let's celebrate a beautiful new beginning with an evening of delicious food, music, laughter, and wonderful memories. We would love to have you with us!",
      date: "2026-12-13",
      startTime: "18:30",
      endTime: "23:30",
      venue: "Hotel river view, Nalagarh",
      address: "https://maps.app.goo.gl/7oJkQGfgHapNvX256",
      dressCode: "Formal / Indian Festive",
      image: reception,
    },
  ] satisfies WeddingEvent[] as WeddingEvent[],
  venue: {
    name: "",
    address: "",
    mapsUrl: "",
    parking: "",
    accommodation: "",
  },
  gallery: [
    { src: hero, alt: "Palace courtyard dressed in marigolds", category: "Celebrations" },
    {
      src: details,
      alt: "Henna hands holding marigold petals",
      category: "Our Moments",
      tall: true,
    },
    { src: haldi, alt: "Haldi setup with brass bowls", category: "Celebrations" },
    {
      src: mehendi,
      alt: "Mehendi cushions and floral jewellery",
      category: "Pre-Wedding",
      tall: true,
    },
    { src: sangeet, alt: "Sangeet stage with chandeliers", category: "Celebrations" },
    { src: wedding, alt: "Mandap with sacred fire", category: "Family & Friends" },
    {
      src: reception,
      alt: "Reception hall in blush and gold",
      category: "Family & Friends",
      tall: true,
    },
    { src: bikaner, alt: "Sandstone palace of Bikaner", category: "Our Moments" },
  ] as GalleryImage[],
  // Drop an mp3 in public/audio and set e.g. "/audio/shehnai.mp3" to enable the music toggle.
  musicSrc: "",
  rsvp: {
    // Set to a POST URL accepting JSON to enable RSVP submission.
    endpoint: "",
  },
};

export type WeddingData = typeof weddingData;
