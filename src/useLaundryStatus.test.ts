import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLaundryStatus, getActiveRule } from "@/useLaundryStatus";
import { scheduleRules } from "@/schedule";

const [rule] = scheduleRules;

function mockNow(isoDateTime: string) {
  vi.setSystemTime(new Date(isoDateTime));
}

describe("getActiveRule", () => {
  it("returns the only rule regardless of date", () => {
    expect(getActiveRule("2026-01-01")).toBe(rule);
    expect(getActiveRule("2026-12-31")).toBe(rule);
  });
});

describe("useLaundryStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports the 06:00-00:00 hours", () => {
    mockNow("2026-09-27T15:00:00Z");
    const { result } = renderHook(() => useLaundryStatus());

    expect(result.current.openTime).toBe("06:00");
    expect(result.current.closeTime).toBe("00:00");
  });

  it("reports open/closed correctly against the 06:00-00:00 hours", () => {
    // 20:00 São Paulo time, well within the open window.
    mockNow("2026-09-20T23:00:00Z");
    const { result } = renderHook(() => useLaundryStatus());
    expect(result.current.isOpen).toBe(true);

    // 03:00 São Paulo time, before opening.
    mockNow("2026-09-21T06:00:00Z");
    const { result: closedResult } = renderHook(() => useLaundryStatus());
    expect(closedResult.current.isOpen).toBe(false);
  });
});
