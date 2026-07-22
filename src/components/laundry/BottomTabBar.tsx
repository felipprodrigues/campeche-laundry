import { WashingMachine, CalendarDays, Info } from "lucide-react";

export type Tab = "maquinas" | "calendario" | "informacoes";

const tabs: { id: Tab; label: string; icon: typeof WashingMachine }[] = [
  { id: "informacoes", label: "Informações", icon: Info },
  { id: "maquinas", label: "Lavanderia", icon: WashingMachine },
  { id: "calendario", label: "Calendário", icon: CalendarDays },
];

export function BottomTabBar({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="sticky bottom-0 flex border-t bg-card/95 backdrop-blur">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-colors duration-200 ${
              isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
