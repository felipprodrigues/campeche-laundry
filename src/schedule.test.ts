import { describe, expect, it } from "vitest";
import { machines, totalUnits, weekdayDisplayOrder, weekdayOrder } from "@/schedule";

describe("totalUnits", () => {
  it("counts each distinct apartment unit exactly once across all machines/weekdays", () => {
    // 32 apartments (AP01-AP32) appear repeatedly across the 4 machines' weekly
    // rotations; totalUnits must dedupe them rather than counting slots.
    expect(totalUnits).toBe(32);
  });

  it("stays in sync if the rotation data changes", () => {
    const expected = new Set(
      machines.flatMap((m) => Object.values(m.rotation).flat()),
    ).size;
    expect(totalUnits).toBe(expected);
  });
});

describe("weekday ordering tables", () => {
  it("keeps weekdayOrder aligned with JS Date#getDay indices (0=domingo..6=sabado)", () => {
    expect(weekdayOrder[0]).toBe("domingo");
    expect(weekdayOrder[6]).toBe("sabado");
    expect(weekdayOrder).toHaveLength(7);
  });

  it("keeps weekdayDisplayOrder as a Monday-first permutation of the same 7 days", () => {
    expect(weekdayDisplayOrder[0]).toBe("segunda");
    expect(weekdayDisplayOrder[6]).toBe("domingo");
    expect(new Set(weekdayDisplayOrder)).toEqual(new Set(weekdayOrder));
  });
});
