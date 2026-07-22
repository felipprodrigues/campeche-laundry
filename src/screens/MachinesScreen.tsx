import { format } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { Clock3, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatsRow } from "@/components/laundry/StatsRow";
import { MachineCard } from "@/components/laundry/MachineCard";
import { LegendRow } from "@/components/laundry/LegendRow";
import { TIME_ZONE, totalUnits } from "@/schedule";
import { useNow } from "@/useNow";
import { useMachineSchedule } from "@/useMachineSchedule";
import { useLaundryStatus } from "@/useLaundryStatus";

export function MachinesScreen() {
  const now = useNow();
  const machinesToday = useMachineSchedule();
  const { isOpen, openTime, closeTime } = useLaundryStatus();

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

      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-3 py-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge
              className={
                isOpen
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
              }
            >
              <span
                className={`mr-1 size-1.5 rounded-full ${isOpen ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400"}`}
              />
              {isOpen ? "Aberta agora" : "Fechada agora"}
            </Badge>
            <p className="text-xl font-bold tracking-tight">
              {openTime} – {closeTime}
            </p>
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-sm font-bold text-green-700 dark:text-green-400">
              Traga seus produtos
            </p>
            <p className="text-xs text-muted-foreground">
              Use sabão e amaciante de sua preferência.
            </p>
          </div>
        </CardContent>
      </Card>

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
