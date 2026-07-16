import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomTabBar } from "@/components/laundry/BottomTabBar";

describe("BottomTabBar", () => {
  it("renders all three tabs", () => {
    render(<BottomTabBar active="maquinas" onChange={vi.fn()} />);

    expect(screen.getByText("Máquinas")).toBeInTheDocument();
    expect(screen.getByText("Calendário")).toBeInTheDocument();
    expect(screen.getByText("Informações")).toBeInTheDocument();
  });

  it("highlights the active tab", () => {
    render(<BottomTabBar active="calendario" onChange={vi.fn()} />);

    const activeButton = screen.getByText("Calendário").closest("button")!;
    const inactiveButton = screen.getByText("Máquinas").closest("button")!;

    expect(activeButton.className).toMatch(/text-blue-600/);
    expect(inactiveButton.className).not.toMatch(/text-blue-600/);
  });

  it("calls onChange with the clicked tab's id", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<BottomTabBar active="maquinas" onChange={onChange} />);

    await user.click(screen.getByText("Informações"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("informacoes");
  });
});
