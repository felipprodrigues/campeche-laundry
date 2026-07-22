import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WashingMachine } from "lucide-react";
import { InfoBanner } from "@/components/laundry/InfoBanner";
import { dailySlots, machines, weekdayDisplayOrder, weekdayShortLabels } from "@/schedule";
import { useNow } from "@/useNow";

export function CalendarScreen({ onNavigateToMachines }: { onNavigateToMachines: () => void }) {
  const now = useNow();

  return (
    <div className="flex flex-col gap-3">
      <InfoBanner onClick={onNavigateToMachines} />

      <p className="text-sm text-muted-foreground">
        Rotina semanal fixa — mesma distribuição toda semana.
      </p>

      {machines.map((machine) => (
        <Card key={machine.id}>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
              <WashingMachine className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-base">{machine.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-center text-xs">
                <thead>
                  <tr>
                    <th className="w-12 pb-1 text-left font-medium text-muted-foreground"> </th>
                    {weekdayDisplayOrder.map((day) => (
                      <th
                        key={day}
                        className={`pb-1 font-medium ${
                          day === now.weekday
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {weekdayShortLabels[day]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailySlots.map((time, slotIndex) => (
                    <tr key={time}>
                      <td className="py-1 text-left font-medium text-muted-foreground">{time}</td>
                      {weekdayDisplayOrder.map((day) => (
                        <td
                          key={day}
                          className={`rounded-md py-1 font-semibold ${
                            day === now.weekday
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                              : ""
                          }`}
                        >
                          {machine.rotation[day][slotIndex]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
