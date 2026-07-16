import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMachineSchedule } from "@/useMachineSchedule";

// All three fixed instants below land on a Thursday (quinta) in São Paulo,
// which keeps the machine-1 rotation ("AP28","AP17","AP18","AP21") constant
// across scenarios so only the clock changes between tests.

describe("useMachineSchedule", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("marks past slots done, the containing slot current, and later slots upcoming", () => {
    // 11:30 São Paulo time, before the 2026-09-28 hours cutover.
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

  it("rolls over to tomorrow's first slot once today's rotation is finished (pre-cutover hours)", () => {
    // 20:00 São Paulo time, still before the cutover: the old 19:30 close
    // means the last slot has zero duration and is already "done" by 20:00.
    vi.setSystemTime(new Date("2026-01-15T23:00:00Z"));
    const { result } = renderHook(() => useMachineSchedule());
    const m1 = result.current.find((m) => m.id === "m1")!;

    expect(m1.slots.map((s) => s.status)).toEqual(["done", "done", "done", "done"]);
    expect(m1.currentSlot).toBeNull();
    expect(m1.nextUp).toEqual({
      kind: "next-day",
      unit: "AP12", // machine 1's sexta (Friday) first slot
      time: "06:00",
      etaMinutes: 600,
    });
  });

  it("keeps the last slot open past 19:30 once the extended-hours rule takes effect", () => {
    // Same 20:00 São Paulo wall-clock time as above, but after 2026-09-28 the
    // close time becomes 00:00, so the 19:30 slot now runs until midnight.
    vi.setSystemTime(new Date("2026-10-15T23:00:00Z"));
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
