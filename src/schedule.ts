// All business logic data lives here. Change hours, the rotation, or the
// weekly limit by editing this file — no other file needs to change.

export const TIME_ZONE = "America/Sao_Paulo";

export interface ScheduleRule {
  /** 'YYYY-MM-DD', inclusive. null = no lower bound. */
  validFrom: string | null;
  /** 'YYYY-MM-DD', inclusive. null = no upper bound. */
  validUntil: string | null;
  /** 'HH:MM' */
  open: string;
  /** 'HH:MM'. "00:00" means midnight (end of day), not start of day. */
  close: string;
}

// Same hours apply every day of the week. Ordered list of rules over time;
// add a new entry whenever the condo announces a change.
export const scheduleRules: ScheduleRule[] = [
  { validFrom: null, validUntil: "2026-09-27", open: "06:00", close: "19:30" },
  { validFrom: "2026-09-28", validUntil: null, open: "06:00", close: "00:00" },
];

export const weeklyLimitPerUnit = 2;

// Fixed daily slot start times, same every day regardless of the schedule
// rule change above.
export const dailySlots = ["06:00", "10:30", "15:00", "19:30"] as const;

export type Weekday =
  | "domingo"
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado";

// Index matches JS Date#getDay() / #getUTCDay() (0 = domingo ... 6 = sábado).
export const weekdayOrder: Weekday[] = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

// Monday-first order, for display purposes (calendar grid, etc).
export const weekdayDisplayOrder: Weekday[] = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

export const weekdayShortLabels: Record<Weekday, string> = {
  domingo: "Dom",
  segunda: "Seg",
  terca: "Ter",
  quarta: "Qua",
  quinta: "Qui",
  sexta: "Sex",
  sabado: "Sáb",
};

export const weekdayLabels: Record<Weekday, string> = {
  domingo: "Domingo",
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
};

export interface Machine {
  id: string;
  label: string;
  /** Unit assigned to each of the 4 dailySlots, per weekday. */
  rotation: Record<Weekday, [string, string, string, string]>;
}

export const machines: Machine[] = [
  {
    id: "m1",
    label: "Máquina 1",
    rotation: {
      segunda: ["AP12", "AP16", "AP05", "AP09"],
      terca: ["AP15", "AP13", "AP25", "AP29"],
      quarta: ["AP05", "AP10", "AP14", "AP32"],
      quinta: ["AP28", "AP17", "AP18", "AP21"],
      sexta: ["AP12", "AP16", "AP11", "AP09"],
      sabado: ["AP15", "AP13", "AP25", "AP10"],
      domingo: ["AP11", "AP31", "AP14", "AP32"],
    },
  },
  {
    id: "m2",
    label: "Máquina 2",
    rotation: {
      segunda: ["AP26", "AP04", "AP06", "AP07"],
      terca: ["AP19", "AP03", "AP23", "AP30"],
      quarta: ["AP08", "AP01", "AP20", "AP02"],
      quinta: ["AP26", "AP22", "AP24", "AP31"],
      sexta: ["AP28", "AP04", "AP06", "AP07"],
      sabado: ["AP19", "AP03", "AP23", "AP30"],
      domingo: ["AP08", "AP01", "AP20", "AP16"],
    },
  },
  {
    id: "m3",
    label: "Máquina 3",
    rotation: {
      segunda: ["AP28", "AP17", "AP18", "AP21"],
      terca: ["AP11", "AP14", "AP31", "AP32"],
      quarta: ["AP13", "AP09", "AP25", "AP29"],
      quinta: ["AP12", "AP16", "AP05", "AP10"],
      sexta: ["AP13", "AP09", "AP25", "AP29"],
      sabado: ["AP11", "AP14", "AP31", "AP32"],
      domingo: ["AP12", "AP28", "AP05", "AP10"],
    },
  },
  {
    id: "m4",
    label: "Máquina 4",
    rotation: {
      segunda: ["AP27", "AP22", "AP24", "AP32"],
      terca: ["AP08", "AP01", "AP20", "AP02"],
      quarta: ["AP19", "AP03", "AP23", "AP30"],
      quinta: ["AP26", "AP04", "AP06", "AP07"],
      sexta: ["AP19", "AP03", "AP23", "AP30"],
      sabado: ["AP08", "AP01", "AP20", "AP02"],
      domingo: ["AP26", "AP04", "AP06", "AP07"],
    },
  },
];

export const totalUnits = new Set(
  machines.flatMap((m) => Object.values(m.rotation).flat()),
).size;
