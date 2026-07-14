import { format } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { Clock3, CalendarDays } from "lucide-react";
import { InfoBanner } from "@/components/laundry/InfoBanner";
import { StatsRow } from "@/components/laundry/StatsRow";
import { MachineCard } from "@/components/laundry/MachineCard";
import { LegendRow } from "@/components/laundry/LegendRow";
import { TIME_ZONE, totalUnits } from "@/schedule";
import { useNow } from "@/useNow";
import { useMachineSchedule } from "@/useMachineSchedule";

export function MachinesScreen() {
  const now = useNow();
  const machinesToday = useMachineSchedule();

  const concluidos = machinesToday.reduce(
    (sum, m) => sum + m.slots.filter((s) => s.status === "done").length,
    0,
  );
  const emAndamento = machinesToday.filter((m) => m.currentSlot).length;
  const proximos = machinesToday.reduce(
    (sum, m) => sum + m.slots.filter((s) => s.status === "upcoming").length,
    0,
  );
  const nowLabel = format(now.zonedDate, "HH:mm", { timeZone: TIME_ZONE });

  return (
    <div className="flex flex-col gap-4">
      <InfoBanner />

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock3 className="size-3.5" />
          Atualizado às {nowLabel}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3.5" />
          Hoje, {format(now.zonedDate, "d 'de' MMMM (EEEE)", { timeZone: TIME_ZONE, locale: ptBR })}
        </span>
      </div>

      <StatsRow
        concluidos={concluidos}
        emAndamento={emAndamento}
        apartamentos={totalUnits}
        proximos={proximos}
      />

      <div className="flex flex-col gap-3">
        {machinesToday.map((machine, i) => (
          <MachineCard key={machine.id} machine={machine} index={i} nowLabel={nowLabel} />
        ))}
      </div>

      <LegendRow />
    </div>
  );
}
