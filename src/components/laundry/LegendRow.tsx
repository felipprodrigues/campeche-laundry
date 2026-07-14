import { CheckCircle2, Clock3, CalendarClock } from "lucide-react";

const items = [
  {
    icon: <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />,
    title: "Concluído",
    caption: "Horário finalizado",
  },
  {
    icon: <Clock3 className="size-4 text-blue-600 dark:text-blue-400" />,
    title: "Em andamento",
    caption: "Ocorrendo agora",
  },
  {
    icon: <CalendarClock className="size-4 text-amber-600 dark:text-amber-400" />,
    title: "Próxima vaga",
    caption: "Próximo horário livre",
  },
];

export function LegendRow() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border bg-card p-3">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-2">
          {item.icon}
          <div>
            <p className="text-xs font-medium">{item.title}</p>
            <p className="text-[10px] text-muted-foreground">{item.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
