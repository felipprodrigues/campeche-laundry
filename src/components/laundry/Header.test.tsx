import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/laundry/Header";

describe("Header", () => {
  it("renders the building name and section label", () => {
    render(<Header />);

    expect(screen.getByText("Residencial Campeche")).toBeInTheDocument();
    expect(screen.getByText("Lavanderia")).toBeInTheDocument();
  });
});
