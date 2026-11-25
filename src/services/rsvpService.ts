import { z } from "zod";
import { weddingData } from "@/config/weddingData";

export const EVENT_OPTIONS = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"] as const;

export const rsvpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(20).regex(/^[+\d\s-]*$/, "Digits only").optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1, "At least 1").max(20, "Max 20"),
  attending: z.enum(["yes", "no"], { errorMap: () => ({ message: "Please choose one" }) }),
  events: z.array(z.enum(EVENT_OPTIONS)),
  dietary: z.string().trim().max(200).optional(),
  message: z.string().trim().max(1000).optional(),
});
export type RsvpInput = z.infer<typeof rsvpSchema>;

export class RsvpNotConfiguredError extends Error {}

/** Sends the RSVP to the configured endpoint. Never pretends to succeed without one. */
export async function submitRsvp(data: RsvpInput): Promise<void> {
  const endpoint = weddingData.rsvp.endpoint;
  if (!endpoint) {
    throw new RsvpNotConfiguredError(
      "RSVPs aren't being collected online yet. Please send your reply to the family directly.",
    );
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("We couldn't send your RSVP. Please try again.");
}
