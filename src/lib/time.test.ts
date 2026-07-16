import { describe, expect, it } from "vitest";
import { formatDuration, getSaoPauloNow, timeToMinutes } from "@/lib/time";

describe("timeToMinutes", () => {
  it("converts a normal HH:MM to minutes since midnight", () => {
    expect(timeToMinutes("06:00", false)).toBe(360);
    expect(timeToMinutes("19:30", false)).toBe(19 * 60 + 30);
  });

  it("treats 00:00 as end-of-day (24:00) when isEndOfDay is true", () => {
    expect(timeToMinutes("00:00", true)).toBe(24 * 60);
  });

  it("treats 00:00 as start-of-day (0) when isEndOfDay is false", () => {
    expect(timeToMinutes("00:00", false)).toBe(0);
  });

  it("does not special-case non-midnight times even when isEndOfDay is true", () => {
    expect(timeToMinutes("19:30", true)).toBe(19 * 60 + 30);
  });
});

describe("formatDuration", () => {
  it("shows only minutes when under an hour", () => {
    expect(formatDuration(45)).toBe("45min");
  });

  it("shows only hours when exactly on the hour", () => {
    expect(formatDuration(120)).toBe("2h");
  });

  it("shows hours and minutes when both are present", () => {
    expect(formatDuration(90)).toBe("1h 30min");
  });

  it("falls back to minutes when the duration is zero or negative", () => {
    expect(formatDuration(0)).toBe("0min");
    expect(formatDuration(-10)).toBe("-10min");
  });
});

describe("getSaoPauloNow", () => {
  it("converts a UTC instant to São Paulo wall-clock fields", () => {
    // 2026-01-15T14:30:00Z is 11:30 in São Paulo (UTC-3, no DST since 2019).
    const result = getSaoPauloNow(new Date("2026-01-15T14:30:00Z"));

    expect(result.dateStr).toBe("2026-01-15");
    expect(result.weekday).toBe("quinta");
    expect(result.minutesSinceMidnight).toBe(11 * 60 + 30);
  });

  it("rolls the date back when UTC time is past midnight but São Paulo is still the previous day", () => {
    // 2026-01-15T02:00:00Z is 2026-01-14T23:00:00 in São Paulo.
    const result = getSaoPauloNow(new Date("2026-01-15T02:00:00Z"));

    expect(result.dateStr).toBe("2026-01-14");
    expect(result.weekday).toBe("quarta");
    expect(result.minutesSinceMidnight).toBe(23 * 60);
  });
});
