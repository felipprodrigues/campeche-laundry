import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CalendarScreen } from "@/screens/CalendarScreen";

describe("CalendarScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T14:30:00Z")); // quinta (Thursday) in São Paulo
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders one table per machine with all 7 weekday columns", () => {
    render(<CalendarScreen />);

    expect(screen.getByText("Máquina 1")).toBeInTheDocument();
    expect(screen.getByText("Máquina 4")).toBeInTheDocument();
    expect(screen.getAllByText("Qui")).toHaveLength(4); // one header per machine table
  });

  it("highlights today's weekday column header", () => {
    render(<CalendarScreen />);

    const todayHeaders = screen.getAllByText("Qui");
    for (const header of todayHeaders) {
      expect(header.className).toMatch(/text-blue-600/);
    }
    const otherDayHeader = screen.getAllByText("Seg")[0];
    expect(otherDayHeader.className).not.toMatch(/text-blue-600/);
  });

  it("highlights today's rotation cell with machine 1's actual quinta assignment", () => {
    render(<CalendarScreen />);

    // Machine 1's Thursday 06:00 slot is AP28; it's the only occurrence of
    // AP28 in the table that falls in the highlighted (today) column.
    const matches = screen.getAllByText("AP28");
    const highlighted = matches.filter((el) => el.className.includes("bg-blue-50"));
    expect(highlighted).toHaveLength(1);
  });
});
