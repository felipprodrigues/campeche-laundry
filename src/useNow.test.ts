import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useNow } from "@/useNow";

describe("useNow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T14:30:00Z")); // 11:30 quinta in São Paulo
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the current São Paulo wall-clock fields on mount", () => {
    const { result } = renderHook(() => useNow());

    expect(result.current.dateStr).toBe("2026-01-15");
    expect(result.current.weekday).toBe("quinta");
    expect(result.current.minutesSinceMidnight).toBe(11 * 60 + 30);
  });

  it("refreshes on the 30s interval as time passes", () => {
    const { result } = renderHook(() => useNow());
    expect(result.current.minutesSinceMidnight).toBe(11 * 60 + 30);

    act(() => {
      vi.setSystemTime(new Date("2026-01-15T14:31:00Z"));
      vi.advanceTimersByTime(30_000);
    });

    expect(result.current.minutesSinceMidnight).toBe(11 * 60 + 31);
  });

  it("does not update between interval ticks", () => {
    const { result } = renderHook(() => useNow());

    act(() => {
      vi.setSystemTime(new Date("2026-01-15T14:31:00Z"));
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.minutesSinceMidnight).toBe(11 * 60 + 30);
  });
});
