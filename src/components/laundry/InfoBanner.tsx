import { LaundryIllustration } from "@/components/laundry/LaundryIllustration";

export function InfoBanner({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-blue-50 to-blue-200/70 p-4 text-left transition-opacity active:opacity-90 dark:from-blue-950/50 dark:via-blue-950/40 dark:to-blue-900/40"
    >
      <div className="flex-1">
        <p className="font-bold text-blue-700 dark:text-blue-300">Informação em tempo real</p>
        <p className="text-sm text-muted-foreground">
          Consulte os horários das máquinas e organize seu dia.
        </p>
      </div>
      <LaundryIllustration className="h-24 w-36 shrink-0" />
    </button>
  );
}
