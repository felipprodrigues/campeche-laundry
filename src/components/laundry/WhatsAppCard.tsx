import { ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/laundry/WhatsAppIcon";

export function WhatsAppCard() {
  return (
    <a
      href="https://wa.me/5548996140713"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-4 py-3 shadow-sm transition-opacity active:opacity-80 dark:bg-[#25D366]/15"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
        <WhatsAppIcon className="size-6" />
      </span>
      <span className="flex-1">
        <p className="text-sm font-bold text-foreground">Falar com a administração</p>
        <p className="text-xs text-muted-foreground">Em caso de dúvidas, chame no WhatsApp</p>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
    </a>
  );
}
