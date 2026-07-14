import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WashingMachine, CheckCircle2, Clock3, CircleDot } from "lucide-react";
import { formatDuration } from "@/lib/time";
import type { MachineToday, SlotStatus } from "@/useMachineSchedule";

function slotChipClasses(status: SlotStatus) {
  switch (status) {
    case "done":
      return "border-border bg-muted/40 text-muted-foreground";
    case "current":
      return "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500 dark:bg-blue-950/40 dark:text-blue-300";
    case "upcoming":
      return "border-border bg-background text-foreground";
  }
}

function SlotIcon({ status }: { status: SlotStatus }) {
  if (status === "done")
    return <CheckCircle2 className="size-3.5 text-green-600 dark:text-green-400" />;
  if (status === "current") return <Clock3 className="size-3.5 text-blue-600 dark:text-blue-400" />;
  return <CircleDot className="size-3.5 text-muted-foreground" />;
}

function timelineSegmentClasses(status: SlotStatus) {
  switch (status) {
    case "done":
      return "bg-green-500";
    case "current":
      return "bg-blue-500";
    case "upcoming":
      return "bg-border";
  }
}

const statusBoxTheme = {
  blue: {
    box: "bg-blue-50 dark:bg-blue-950/30",
    dot: "bg-blue-600 dark:bg-blue-400",
    label: "text-blue-700 dark:text-blue-300",
    divider: "border-blue-200 dark:border-blue-800",
  },
  green: {
    box: "bg-green-50 dark:bg-green-950/30",
    dot: "bg-green-600 dark:bg-green-400",
    label: "text-green-700 dark:text-green-300",
    divider: "border-green-200 dark:border-green-800",
  },
  amber: {
    box: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-600 dark:bg-amber-400",
    label: "text-amber-700 dark:text-amber-300",
    divider: "border-amber-200 dark:border-amber-800",
  },
} as const;

function StatusBox({
  color,
  label,
  bigValue,
  caption,
  captionSub,
}: {
  color: keyof typeof statusBoxTheme;
  label: string;
  bigValue: string;
  caption: string;
  captionSub: string;
}) {
  const theme = statusBoxTheme[color];
  return (
    <div className={`flex min-w-0 items-center gap-2 rounded-xl px-2.5 py-1.5 ${theme.box}`}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={`flex items-center gap-1 text-[10px] leading-tight font-medium whitespace-nowrap ${theme.label}`}>
          <span className={`size-1.5 shrink-0 rounded-full ${theme.dot}`} />
          {label}
        </span>
        <span className="text-lg leading-none font-bold">{bigValue}</span>
      </div>
      <div className={`flex min-w-0 flex-col gap-0.5 border-l pl-2 ${theme.divider}`}>
        <span className="truncate text-sm leading-none font-semibold">{caption}</span>
        <span className="truncate text-[10px] text-muted-foreground">{captionSub}</span>
      </div>
    </div>
  );
}

function NextUpBox({ machine }: { machine: MachineToday }) {
  const pairedWithCurrent = Boolean(machine.currentSlot);
  const label =
    pairedWithCurrent || machine.nextUp.kind === "next-day" ? "Próxima vaga" : "Próximo horário livre";
  const color = pairedWithCurrent || machine.nextUp.kind === "next-day" ? "amber" : "green";
  return (
    <StatusBox
      color={color}
      label={label}
      bigValue={machine.nextUp.time}
      caption={machine.nextUp.unit}
      captionSub={`em ${formatDuration(machine.nextUp.etaMinutes)}`}
    />
  );
}

function StatusRow({ machine, nowLabel }: { machine: MachineToday; nowLabel: string }) {
  if (machine.currentSlot) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <StatusBox
          color="blue"
          label="Em andamento"
          bigValue={nowLabel}
          caption={machine.currentSlot.unit}
          captionSub={`até ${machine.currentSlot.endTime}`}
        />
        <NextUpBox machine={machine} />
      </div>
    );
  }

  return <NextUpBox machine={machine} />;
}

export function MachineCard({
  machine,
  index,
  nowLabel,
}: {
  machine: MachineToday;
  index: number;
  nowLabel: string;
}) {
  const hasDone = machine.slots.some((s) => s.status === "done");
  const hasCurrent = Boolean(machine.currentSlot);
  const hasUpcoming = machine.slots.some((s) => s.status === "upcoming");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <WashingMachine className="size-4 text-blue-600 dark:text-blue-400" />
            <span className="absolute -top-1.5 -left-1.5 flex size-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
              {index + 1}
            </span>
          </div>
          <div>
            <CardTitle className="text-base">{machine.label}</CardTitle>
            <p className="text-xs text-muted-foreground">Lava e Seca</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <StatusRow machine={machine} nowLabel={nowLabel} />

        <div className="grid grid-cols-4 gap-2">
          {machine.slots.map((slot) => (
            <div
              key={slot.time}
              className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center ${slotChipClasses(slot.status)}`}
            >
              <SlotIcon status={slot.status} />
              <span className="text-xs font-medium">{slot.time}</span>
              <span className="text-[11px] font-semibold">{slot.unit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 px-1">
          <div className="flex items-center gap-0.5">
            {machine.slots.map((slot, i) => (
              <span
                key={slot.time}
                className={`h-1 flex-1 rounded-full ${timelineSegmentClasses(slot.status)} ${i > 0 ? "ml-0.5" : ""}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span className={hasDone ? "" : "invisible"}>Concluído</span>
            <span className={hasCurrent ? "font-medium text-blue-600 dark:text-blue-400" : "invisible"}>
              Agora
            </span>
            <span className={hasUpcoming ? "" : "invisible"}>Próximo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
