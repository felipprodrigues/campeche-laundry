import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoScreen } from "@/screens/InfoScreen";

describe("InfoScreen", () => {
  it("renders the condo rule sections", () => {
    render(<InfoScreen />);

    expect(screen.getByText("Silêncio")).toBeInTheDocument();
    expect(screen.getByText("Lixo")).toBeInTheDocument();
    expect(screen.getByText("Convivência")).toBeInTheDocument();
    expect(screen.getByText("Mudanças e carga/descarga")).toBeInTheDocument();
    expect(screen.getByText("Proibições")).toBeInTheDocument();
    expect(screen.queryByText("Lavanderia")).not.toBeInTheDocument();
  });
});
