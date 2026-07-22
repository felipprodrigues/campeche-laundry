import type { ReactNode } from "react";
import { CheckCircle2, Clock3, Users, CalendarClock } from "lucide-react";

interface Stat {
  icon: ReactNode;
  value: number;
  label: string;
  bg: string;
}

export function StatsRow({
  concluidos,
  emAndamento,
  apartamentos,
  proximos,
}: {
  concluidos: number;
  emAndamento: number;
  apartamentos: number;
  proximos: number;
}) {
  const stats: Stat[] = [
    {
      icon: <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />,
      value: concluidos,
      label: "concluídos",
      bg: "bg-green-100 dark:bg-green-900/40",
    },
    {
      icon: <Clock3 className="size-4 text-blue-600 dark:text-blue-400" />,
      value: emAndamento,
      label: "em andamento",
      bg: "bg-blue-100 dark:bg-blue-900/40",
    },
    {
      icon: <Users className="size-4 text-slate-600 dark:text-slate-400" />,
      value: apartamentos,
      label: "apartamentos",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
    {
      icon: <CalendarClock className="size-4 text-amber-600 dark:text-amber-400" />,
      value: proximos,
      label: "próximos hoje",
      bg: "bg-amber-100 dark:bg-amber-900/40",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-xl border bg-card p-2 text-center"
        >
          <div className={`flex size-7 items-center justify-center rounded-full ${stat.bg}`}>
            {stat.icon}
          </div>
          <span className="text-lg leading-none font-bold">{stat.value}</span>
          <span className="text-[10px] leading-tight text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
