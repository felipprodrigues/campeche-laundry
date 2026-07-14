import { WashingMachine } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center gap-3">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40">
        <WashingMachine className="size-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
          Lavanderia
        </p>
        <h1 className="text-lg leading-tight font-bold">Residencial Campeche</h1>
      </div>
    </header>
  );
}
