import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/laundry/Header";

describe("Header", () => {
  it("renders the building name and the active section's label", () => {
    render(<Header tab="maquinas" />);

    expect(screen.getByText("Residencial Campeche")).toBeInTheDocument();
    expect(screen.getByText("Lavanderia")).toBeInTheDocument();
  });

  it("switches the section label per tab", () => {
    const { rerender } = render(<Header tab="informacoes" />);
    expect(screen.getByText("Informações do Condomínio")).toBeInTheDocument();

    rerender(<Header tab="calendario" />);
    expect(screen.getByText("Calendário")).toBeInTheDocument();
  });
});
