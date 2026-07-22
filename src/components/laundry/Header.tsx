import { LaundryLogo } from "@/components/laundry/LaundryLogo";
import type { Tab } from "@/components/laundry/BottomTabBar";

const sectionLabels: Record<Tab, string> = {
  informacoes: "Informações do Condomínio",
  maquinas: "Lavanderia",
  calendario: "Calendário",
};

export function Header({ tab }: { tab: Tab }) {
  return (
    <header className="flex items-center gap-3">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#8A9467]">
        <LaundryLogo className="size-7 text-[#F5F3E7]" />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          {sectionLabels[tab]}
        </p>
        <h1 className="text-lg leading-tight font-bold">Residencial Campeche</h1>
      </div>
    </header>
  );
}
