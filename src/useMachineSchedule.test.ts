import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMachineSchedule } from "@/useMachineSchedule";

// All fixed instants below land on a Thursday (quinta) in São Paulo, which
// keeps the machine-1 rotation ("AP28","AP17","AP18","AP21") constant across
// scenarios so only the clock changes between tests.

describe("useMachineSchedule", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("marks past slots done, the containing slot current, and later slots upcoming", () => {
    // 11:30 São Paulo time.
    vi.setSystemTime(new Date("2026-01-15T14:30:00Z"));
    const { result } = renderHook(() => useMachineSchedule());
    const m1 = result.current.find((m) => m.id === "m1")!;

    expect(m1.slots.map((s) => s.status)).toEqual(["done", "current", "upcoming", "upcoming"]);
    expect(m1.currentSlot).toMatchObject({ time: "10:30", unit: "AP17", endTime: "15:00" });
    expect(m1.nextUp).toEqual({
      kind: "free-today",
      unit: "AP18",
      time: "15:00",
      etaMinutes: 210,
    });
  });

  it("keeps the last slot open until midnight (06:00 – 00:00 hours)", () => {
    // 20:00 São Paulo time: the 19:30 slot runs until midnight, so it's current.
    vi.setSystemTime(new Date("2026-01-15T23:00:00Z"));
    const { result } = renderHook(() => useMachineSchedule());
    const m1 = result.current.find((m) => m.id === "m1")!;

    expect(m1.slots.map((s) => s.status)).toEqual(["done", "done", "done", "current"]);
    expect(m1.currentSlot).toMatchObject({ time: "19:30", unit: "AP21", endTime: "00:00" });
    // A slot is in progress, so nextUp reports tomorrow's first turn, not a
    // fresh "free-today" slot (there is none left today).
    expect(m1.nextUp).toEqual({
      kind: "next-day",
      unit: "AP12",
      time: "06:00",
      etaMinutes: 600,
    });
  });

  it("returns one entry per machine, each with 4 daily slots", () => {
    vi.setSystemTime(new Date("2026-01-15T14:30:00Z"));
    const { result } = renderHook(() => useMachineSchedule());

    expect(result.current).toHaveLength(4);
    for (const machine of result.current) {
      expect(machine.slots).toHaveLength(4);
    }
  });
});
