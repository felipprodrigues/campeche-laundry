import { getDay, getHours, getMinutes } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { TIME_ZONE, weekdayOrder, type Weekday } from "@/schedule";

export interface SaoPauloNow {
  /** Wall-clock date, shifted so local getters (getHours, getDay, ...) read São Paulo time. */
  zonedDate: Date;
  dateStr: string; // 'YYYY-MM-DD'
  weekday: Weekday;
  minutesSinceMidnight: number;
}

export function getSaoPauloNow(date: Date): SaoPauloNow {
  const zoned = toZonedTime(date, TIME_ZONE);

  return {
    zonedDate: zoned,
    dateStr: format(zoned, "yyyy-MM-dd", { timeZone: TIME_ZONE }),
    weekday: weekdayOrder[getDay(zoned)],
    minutesSinceMidnight: getHours(zoned) * 60 + getMinutes(zoned),
  };
}

export function timeToMinutes(time: string, isEndOfDay: boolean): number {
  const [h, m] = time.split(":").map(Number);
  if (isEndOfDay && h === 0 && m === 0) return 24 * 60;
  return h * 60 + m;
}

export function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h <= 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}
