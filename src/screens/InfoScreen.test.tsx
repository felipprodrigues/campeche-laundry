import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoScreen } from "@/screens/InfoScreen";

describe("InfoScreen functioning-hours banner", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the hours-change banner before the cutover date", () => {
    vi.setSystemTime(new Date("2026-09-27T15:00:00Z"));
    render(<InfoScreen />);

    expect(screen.getByText(/o horário passa a ser/i)).toBeInTheDocument();
    expect(screen.getByText("06:00 – 19:30")).toBeInTheDocument();
  });

  it("auto-hides the banner and shows the new hours once the cutover date arrives", () => {
    vi.setSystemTime(new Date("2026-09-28T15:00:00Z"));
    render(<InfoScreen />);

    expect(screen.queryByText(/o horário passa a ser/i)).not.toBeInTheDocument();
    expect(screen.getByText("06:00 – 00:00")).toBeInTheDocument();
  });
});
