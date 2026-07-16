import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LegendRow } from "@/components/laundry/LegendRow";

describe("LegendRow", () => {
  it("renders all three status legend entries", () => {
    render(<LegendRow />);

    expect(screen.getByText("Concluído")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
    expect(screen.getByText("Próxima vaga")).toBeInTheDocument();
  });
});
