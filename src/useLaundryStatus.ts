import { useEffect, useState } from "react";
import { scheduleRules, type ScheduleRule } from "@/schedule";
import { getSaoPauloNow, timeToMinutes } from "@/lib/time";

function getActiveRule(dateStr: string): ScheduleRule {
  const rule = scheduleRules.find(
    (r) =>
      (r.validFrom === null || dateStr >= r.validFrom) &&
      (r.validUntil === null || dateStr <= r.validUntil),
  );
  // Falls back to the last rule if the schedule table has a gap.
  return rule ?? scheduleRules[scheduleRules.length - 1];
}

export interface LaundryStatus {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export function useLaundryStatus(): LaundryStatus {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { dateStr, minutesSinceMidnight } = getSaoPauloNow(now);
  const activeRule = getActiveRule(dateStr);
  const openMin = timeToMinutes(activeRule.open, false);
  const closeMin = timeToMinutes(activeRule.close, true);

  return {
    isOpen: minutesSinceMidnight >= openMin && minutesSinceMidnight < closeMin,
    openTime: activeRule.open,
    closeTime: activeRule.close,
  };
}

export { getActiveRule };
