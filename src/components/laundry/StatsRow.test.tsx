import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsRow } from "@/components/laundry/StatsRow";

describe("StatsRow", () => {
  it("renders each stat's value next to its label", () => {
    render(<StatsRow concluidos={5} emAndamento={2} apartamentos={32} proximos={3} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("concluídos")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("em andamento")).toBeInTheDocument();
    expect(screen.getByText("32")).toBeInTheDocument();
    expect(screen.getByText("apartamentos")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("próximos hoje")).toBeInTheDocument();
  });

  it("renders zero values instead of hiding the stat", () => {
    render(<StatsRow concluidos={0} emAndamento={0} apartamentos={0} proximos={0} />);

    expect(screen.getAllByText("0")).toHaveLength(4);
  });
});
