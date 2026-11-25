import { useEffect, useState } from "react";
import type { WeddingEvent } from "@/config/weddingData";

const pad = (n: number) => String(n).padStart(2, "0");

/** Google Calendar URL, or null when date/start time are not configured. */
export function googleCalendarUrl(e: WeddingEvent, names: string): string | null {
  if (!e.date || !e.startTime) return null;
  const toUtc = (time: string) => {
    const d = new Date(`${e.date}T${time}:00+05:30`);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };
  const start = toUtc(e.startTime);
  const end = toUtc(e.endTime || e.startTime);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.name} — ${names}`,
    dates: `${start}/${end}`,
    details: e.description,
    location: [e.venue, e.address].filter(Boolean).join(", "),
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export function mapsUrl(query: string): string | null {
  if (!query.trim()) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function formatEventDate(date: string): string {
  if (!date) return "To be announced";
  return new Date(`${date}T12:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function formatTime(t: string): string {
  if (!t) return "";
  const [h = 0, m = 0] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

export function whatsappShareUrl(url: string): string {
  const text = `You're invited to celebrate the wedding of Sumiran & Rohit on 11 December 2026 in Sarita Sadan, B-41, Gandhi Colony, Pawanpuri,Bikaner, Rajasthan! Join us for a beautiful celebration of love. View the invitation: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getRemaining(targetISO: string, now: number) {
  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export function useCountdown(targetISO: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now === null ? null : getRemaining(targetISO, now);
}
