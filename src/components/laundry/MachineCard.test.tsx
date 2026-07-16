import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MachineCard } from "@/components/laundry/MachineCard";
import type { MachineToday } from "@/useMachineSchedule";

function machine(overrides: Partial<MachineToday>): MachineToday {
  return {
    id: "m1",
    label: "Máquina 1",
    slots: [
      { time: "06:00", endTime: "10:30", unit: "AP01", status: "done" },
      { time: "10:30", endTime: "15:00", unit: "AP02", status: "done" },
      { time: "15:00", endTime: "19:30", unit: "AP03", status: "upcoming" },
      { time: "19:30", endTime: "19:30", unit: "AP04", status: "upcoming" },
    ],
    currentSlot: null,
    nextUp: { kind: "free-today", unit: "AP03", time: "15:00", etaMinutes: 45 },
    ...overrides,
  };
}

describe("MachineCard", () => {
  it("shows an in-progress box plus 'Próxima vaga' when a slot is current", () => {
    const m = machine({
      slots: [
        { time: "06:00", endTime: "10:30", unit: "AP01", status: "done" },
        { time: "10:30", endTime: "15:00", unit: "AP02", status: "current" },
        { time: "15:00", endTime: "19:30", unit: "AP03", status: "upcoming" },
        { time: "19:30", endTime: "19:30", unit: "AP04", status: "upcoming" },
      ],
      currentSlot: { time: "10:30", endTime: "15:00", unit: "AP02", status: "current" },
      nextUp: { kind: "free-today", unit: "AP03", time: "15:00", etaMinutes: 45 },
    });
    render(<MachineCard machine={m} index={0} nowLabel="12:00" />);

    expect(screen.getByText("Em andamento")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    // A slot is in progress, so the next box is always the amber "Próxima vaga",
    // even though the underlying nextUp.kind is "free-today".
    expect(screen.getByText("Próxima vaga")).toBeInTheDocument();
    expect(screen.queryByText("Próximo horário livre")).not.toBeInTheDocument();
  });

  it("labels the next slot 'Próximo horário livre' when nothing is running and a slot is free later today", () => {
    const m = machine({ currentSlot: null, nextUp: { kind: "free-today", unit: "AP03", time: "15:00", etaMinutes: 45 } });
    render(<MachineCard machine={m} index={0} nowLabel="12:00" />);

    expect(screen.queryByText("Em andamento")).not.toBeInTheDocument();
    expect(screen.getByText("Próximo horário livre")).toBeInTheDocument();
  });

  it("labels the next slot 'Próxima vaga' when today's rotation is finished and it rolls to tomorrow", () => {
    const m = machine({
      currentSlot: null,
      nextUp: { kind: "next-day", unit: "AP12", time: "06:00", etaMinutes: 600 },
    });
    render(<MachineCard machine={m} index={0} nowLabel="21:00" />);

    expect(screen.getByText("Próxima vaga")).toBeInTheDocument();
    expect(screen.getByText("AP12")).toBeInTheDocument();
  });

  it("renders every slot's time and assigned unit", () => {
    render(<MachineCard machine={machine({})} index={0} nowLabel="12:00" />);

    expect(screen.getByText("AP01")).toBeInTheDocument();
    expect(screen.getByText("AP02")).toBeInTheDocument();
    // AP03 appears twice: once in the slot grid, once in the NextUpBox
    // caption (nextUp points at that same slot).
    expect(screen.getAllByText("AP03").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("AP04")).toBeInTheDocument();
  });

  it("only shows the timeline captions relevant to the slots present", () => {
    const m = machine({
      slots: [
        { time: "06:00", endTime: "10:30", unit: "AP01", status: "upcoming" },
        { time: "10:30", endTime: "15:00", unit: "AP02", status: "upcoming" },
        { time: "15:00", endTime: "19:30", unit: "AP03", status: "upcoming" },
        { time: "19:30", endTime: "19:30", unit: "AP04", status: "upcoming" },
      ],
      currentSlot: null,
    });
    render(<MachineCard machine={m} index={0} nowLabel="05:00" />);

    expect(screen.getByText("Concluído").className).toMatch(/invisible/);
    expect(screen.getByText("Agora").className).toMatch(/invisible/);
    expect(screen.getByText("Próximo").className).not.toMatch(/invisible/);
  });
});
