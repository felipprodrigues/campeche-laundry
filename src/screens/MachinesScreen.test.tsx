import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MachinesScreen } from "@/screens/MachinesScreen";

describe("MachinesScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 11:30 São Paulo time: every machine has slot 0 done, slot 1 current,
    // slots 2-3 upcoming (the daily slot times are the same for all machines).
    vi.setSystemTime(new Date("2026-01-15T14:30:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("aggregates per-slot stats across all 4 machines", () => {
    const { container } = render(<MachinesScreen />);

    // Scope to StatsRow's own tiles (rounded-xl/bg-card) so MachineCard's
    // reused "text-lg leading-none font-bold" value spans aren't picked up.
    const statValues = Array.from(
      container.querySelectorAll(".rounded-xl.border.bg-card.p-2 .text-lg.leading-none.font-bold"),
    ).map((el) => el.textContent);

    expect(statValues).toEqual(["4", "4", "32", "8"]);
    expect(screen.getAllByText("em andamento")).toHaveLength(1);
  });

  it("shows the current São Paulo time in the 'Atualizado às' line", () => {
    render(<MachinesScreen />);

    expect(screen.getByText(/Atualizado às 11:30/)).toBeInTheDocument();
  });

  it("renders a MachineCard for each of the 4 machines", () => {
    render(<MachinesScreen />);

    expect(screen.getByText("Máquina 1")).toBeInTheDocument();
    expect(screen.getByText("Máquina 2")).toBeInTheDocument();
    expect(screen.getByText("Máquina 3")).toBeInTheDocument();
    expect(screen.getByText("Máquina 4")).toBeInTheDocument();
  });
});
