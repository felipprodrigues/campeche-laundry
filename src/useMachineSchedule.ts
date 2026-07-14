import { useEffect, useState } from "react";
import { dailySlots, machines, weekdayOrder, type Machine, type Weekday } from "@/schedule";
import { getSaoPauloNow, timeToMinutes } from "@/lib/time";
import { getActiveRule } from "@/useLaundryStatus";

export type SlotStatus = "done" | "current" | "upcoming";

export interface MachineSlot {
  time: string;
  endTime: string;
  unit: string;
  status: SlotStatus;
}

export interface NextUp {
  /** Whether the next slot is still today, or the rotation has finished for today. */
  kind: "free-today" | "next-day";
  unit: string;
  time: string;
  etaMinutes: number;
}

export interface MachineToday {
  id: string;
  label: string;
  slots: MachineSlot[];
  currentSlot: MachineSlot | null;
  /** The turn that follows now — later today, or tomorrow's first slot if the rotation is done for today. */
  nextUp: NextUp;
}

function buildMachineToday(
  machine: Machine,
  weekday: Weekday,
  tomorrowWeekday: Weekday,
  nowMin: number,
  closeTime: string,
): MachineToday {
  const units = machine.rotation[weekday];

  const slots: MachineSlot[] = dailySlots.map((time, i) => {
    const endTime = i < dailySlots.length - 1 ? dailySlots[i + 1] : closeTime;
    const startMin = timeToMinutes(time, false);
    const endMin = timeToMinutes(endTime, true);
    const status: SlotStatus = nowMin < startMin ? "upcoming" : nowMin < endMin ? "current" : "done";
    return { time, endTime, unit: units[i], status };
  });

  const currentSlot = slots.find((s) => s.status === "current") ?? null;

  const upcomingToday = slots.find((s) => s.status === "upcoming");
  const nextUp: NextUp = upcomingToday
    ? {
        kind: "free-today",
        unit: upcomingToday.unit,
        time: upcomingToday.time,
        etaMinutes: timeToMinutes(upcomingToday.time, false) - nowMin,
      }
    : {
        kind: "next-day",
        unit: machine.rotation[tomorrowWeekday][0],
        time: dailySlots[0],
        etaMinutes: 24 * 60 - nowMin + timeToMinutes(dailySlots[0], false),
      };

  return { id: machine.id, label: machine.label, slots, currentSlot, nextUp };
}

export function useMachineSchedule(): MachineToday[] {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { dateStr, weekday, minutesSinceMidnight } = getSaoPauloNow(now);
  const activeRule = getActiveRule(dateStr);
  const tomorrowWeekday = weekdayOrder[(weekdayOrder.indexOf(weekday) + 1) % 7];

  return machines.map((m) =>
    buildMachineToday(m, weekday, tomorrowWeekday, minutesSinceMidnight, activeRule.close),
  );
}
