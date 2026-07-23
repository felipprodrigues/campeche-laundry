import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoRowColor = "indigo" | "orange" | "teal" | "sky" | "red";

const colorStyles: Record<InfoRowColor, { bg: string; icon: string; label: string }> = {
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-500/15",
    icon: "text-indigo-600 dark:text-indigo-400",
    label: "text-indigo-600 dark:text-indigo-400",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-500/15",
    icon: "text-orange-600 dark:text-orange-400",
    label: "text-orange-600 dark:text-orange-400",
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-500/15",
    icon: "text-teal-600 dark:text-teal-400",
    label: "text-teal-600 dark:text-teal-400",
  },
  sky: {
    bg: "bg-sky-100 dark:bg-sky-500/15",
    icon: "text-sky-600 dark:text-sky-400",
    label: "text-sky-600 dark:text-sky-400",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-500/15",
    icon: "text-red-600 dark:text-red-400",
    label: "text-red-600 dark:text-red-400",
  },
};

type InfoRowProps = {
  icon: LucideIcon;
  color: InfoRowColor;
  label?: string;
  children: React.ReactNode;
};

export function InfoRow({ icon: Icon, color, label, children }: InfoRowProps) {
  const styles = colorStyles[color];

  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          styles.bg
        )}
      >
        <Icon className={cn("size-4", styles.icon)} />
      </div>
      <div className="flex-1 pt-1.5 text-sm text-muted-foreground">
        {label ? (
          <>
            <p className={cn("font-semibold", styles.label)}>{label}</p>
            <p>{children}</p>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
