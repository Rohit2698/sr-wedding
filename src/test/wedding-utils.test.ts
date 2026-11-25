import { describe, expect, it } from "vitest";
import { getRemaining, googleCalendarUrl } from "@/lib/wedding-utils";
import { weddingData } from "@/config/weddingData";

describe("wedding rules", () => {
  it("counts down to 11 Dec 2026 midnight IST", () => {
    const r = getRemaining(weddingData.weddingDateISO, new Date("2026-12-10T00:00:00+05:30").getTime());
    expect(r.days).toBe(1);
    expect(r.done).toBe(false);
  });
  it("is done after the wedding date", () => {
    expect(getRemaining(weddingData.weddingDateISO, new Date("2026-12-12T00:00:00+05:30").getTime()).done).toBe(true);
  });
  it("gives no calendar link without a start time", () => {
    const e = weddingData.events.find((x) => x.id === "wedding")!;
    expect(googleCalendarUrl({ ...e, startTime: "" }, "S & R")).toBeNull();
  });
  it("converts IST times to UTC for calendar", () => {
    const e = weddingData.events.find((x) => x.id === "wedding")!;
    expect(googleCalendarUrl({ ...e, startTime: "19:00", endTime: "23:00" }, "S & R")).toContain("20261211T133000Z%2F20261211T173000Z");
  });
});
