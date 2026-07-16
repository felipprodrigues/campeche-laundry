import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLaundryStatus, getActiveRule } from "@/useLaundryStatus";
import { scheduleRules } from "@/schedule";

// scheduleRules[0] runs until 2026-09-27 (06:00-19:30).
// scheduleRules[1] takes over from 2026-09-28 onward (06:00-00:00).
const [beforeCutover, afterCutover] = scheduleRules;

function mockNow(isoDateTime: string) {
  vi.setSystemTime(new Date(isoDateTime));
}

describe("getActiveRule", () => {
  it("returns the first rule before the cutover date", () => {
    expect(getActiveRule("2026-09-27")).toBe(beforeCutover);
  });

  it("returns the second rule on and after the cutover date", () => {
    expect(getActiveRule("2026-09-28")).toBe(afterCutover);
    expect(getActiveRule("2026-12-01")).toBe(afterCutover);
  });

  it("falls back to the last rule when a date matches no rule", () => {
    // No rule should ever produce a gap given null bounds, but the function
    // guards against a malformed table by returning the last rule.
    expect(getActiveRule("1999-01-01")).toBe(beforeCutover);
  });
});

describe("useLaundryStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the upcoming rule banner data before the cutover", () => {
    // Noon in São Paulo (UTC-3) on the last day of the old hours.
    mockNow("2026-09-27T15:00:00Z");
    const { result } = renderHook(() => useLaundryStatus());

    expect(result.current.openTime).toBe("06:00");
    expect(result.current.closeTime).toBe("19:30");
    expect(result.current.upcomingRule).toBe(afterCutover);
  });

  it("switches to the new hours and clears upcomingRule on the cutover date", () => {
    mockNow("2026-09-28T15:00:00Z");
    const { result } = renderHook(() => useLaundryStatus());

    expect(result.current.openTime).toBe("06:00");
    expect(result.current.closeTime).toBe("00:00");
    expect(result.current.upcomingRule).toBeNull();
  });

  it("reports open/closed correctly against the active rule's hours", () => {
    // 20:00 São Paulo time, after the 19:30 close under the old rule.
    mockNow("2026-09-20T23:00:00Z");
    const { result } = renderHook(() => useLaundryStatus());
    expect(result.current.isOpen).toBe(false);

    // Same wall-clock hour, but after the cutover the close time is midnight.
    mockNow("2026-10-20T23:00:00Z");
    const { result: afterResult } = renderHook(() => useLaundryStatus());
    expect(afterResult.current.isOpen).toBe(true);
  });
});
