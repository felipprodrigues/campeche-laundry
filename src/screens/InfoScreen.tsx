import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { SoapIllustration } from "@/components/laundry/SoapIllustration";
import { WhatsAppIcon } from "@/components/laundry/WhatsAppIcon";
import { useLaundryStatus } from "@/useLaundryStatus";

function formatBR(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function InfoScreen() {
  const { isOpen, openTime, closeTime, upcomingRule } = useLaundryStatus();

  return (
    <div className="flex flex-col gap-4">
      {upcomingRule && (
        <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
          A partir de <strong>{formatBR(upcomingRule.validFrom!)}</strong>, o horário passa a ser{" "}
          <strong>
            {upcomingRule.open} – {upcomingRule.close}
          </strong>
          .
        </p>
      )}

      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-2 text-center">
          <Badge
            className={
              isOpen
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            }
          >
            <span
              className={`mr-1 size-1.5 rounded-full ${isOpen ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400"}`}
            />
            {isOpen ? "Aberta agora" : "Fechada agora"}
          </Badge>
          <p className="text-3xl font-bold tracking-tight">
            {openTime} – {closeTime}
          </p>
          <p className="text-xs text-muted-foreground">Todos os dias da semana</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="flex items-center gap-3 py-3">
          <div className="flex-1">
            <p className="font-bold text-green-700 dark:text-green-400">Traga seu produto</p>
            <p className="text-sm text-muted-foreground">
              Cada unidade deve levar seu próprio sabão e amaciante para manter o espaço limpo e
              organizado.
            </p>
          </div>
          <SoapIllustration className="h-20 w-20 shrink-0" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3 py-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="font-bold">Lavanderia</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Seguir cronograma de uso por apartamento/horários, localizado na lavanderia.
          </p>
          <p className="text-sm text-muted-foreground">
            Sujeito a multa de <strong className="text-foreground">R$100,00</strong>.
          </p>
          <p className="text-sm text-muted-foreground">Agradecemos a compreensão de todos</p>
        </CardContent>
      </Card>

      <a
        href="https://wa.me/5548996140713"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-white shadow-sm transition-opacity active:opacity-90"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20">
          <WhatsAppIcon className="size-6" />
        </span>
        <span className="flex-1">
          <p className="font-bold">Falar com a administração</p>
          <p className="text-sm text-white/90">Em caso de dúvidas, chame no WhatsApp</p>
        </span>
        <ChevronRight className="size-5 shrink-0" />
      </a>
    </div>
  );
}
