import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ChevronRight, Home, Recycle, Truck, VolumeX } from "lucide-react";
import { WhatsAppIcon } from "@/components/laundry/WhatsAppIcon";

export function InfoScreen() {
  return (
    <div className="flex flex-col gap-4">
      <p className="px-1 text-sm font-bold">Silêncio</p>

      <Card className="border-l-4 border-l-indigo-400 dark:border-l-indigo-500">
        <CardContent className="flex flex-col gap-3 py-3">
          <VolumeX className="size-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Seg. a Sex.:</strong> 22h às 7h
            </li>
            <li>
              <strong className="text-foreground">Sáb. e Dom.:</strong> 22h às 8h
            </li>
          </ul>
        </CardContent>
      </Card>

      <p className="px-1 text-sm font-bold">Lixo</p>

      <Card className="border-l-4 border-l-orange-400 dark:border-l-orange-500">
        <CardContent className="flex flex-col gap-3 py-3">
          <Recycle className="size-5 shrink-0 text-orange-600 dark:text-orange-400" />
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Segundas, Quartas e Sextas.</li>
            <li>Contentores na calçada até 16h.</li>
            <li>
              <strong className="text-foreground">Sem contentores:</strong> apenas sacos pretos.
            </li>
            <li>
              <strong className="text-foreground">Com contentores:</strong> sacos pretos ou
              sacolas.
            </li>
          </ul>
        </CardContent>
      </Card>

      <p className="px-1 text-sm font-bold">Convivência</p>

      <Card className="border-l-4 border-l-teal-400 dark:border-l-teal-500">
        <CardContent className="flex flex-col gap-3 py-3">
          <Home className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Objetos:</strong> não deixe objetos em frente ao
              apartamento.
            </li>
            <li>
              <strong className="text-foreground">Visitantes:</strong> cada morador é responsável
              pela conduta de seus visitantes.
            </li>
            <li>
              <strong className="text-foreground">Áreas comuns:</strong> não é permitida a
              permanência de animais de estimação ou bens pessoais.
            </li>
            <li>
              <strong className="text-foreground">Varais:</strong> permitidos apenas varais de
              chão.
            </li>
          </ul>
        </CardContent>
      </Card>

      <p className="px-1 text-sm font-bold">Mudanças e carga/descarga</p>

      <Card className="border-l-4 border-l-sky-400 dark:border-l-sky-500">
        <CardContent className="flex flex-col gap-3 py-3">
          <Truck className="size-5 shrink-0 text-sky-600 dark:text-sky-400" />
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Seg. a Sáb.:</strong> 8h às 20h
            </li>
            <li>Não permitidas aos domingos e feriados.</li>
          </ul>
        </CardContent>
      </Card>

      <p className="px-1 text-sm font-bold">Proibições</p>

      <Card className="border-l-4 border-l-red-400 dark:border-l-red-500">
        <CardContent className="flex flex-col gap-3 py-3">
          <AlertTriangle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Cigarros pela janela:</strong> proibido atirar
              fósforos, pontas de cigarro ou quaisquer objetos pelas portas e janelas.
            </li>
            <li>
              <strong className="text-foreground">Entupimentos:</strong> não coloque em vasos
              sanitários, pias e tanques objetos que possam causar entupimento.
            </li>
          </ul>
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

      <p className="-mt-2 text-center text-[10px] text-muted-foreground/60">
        Developed by{" "}
        <a
          href="https://github.com/felipprodrigues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/60 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        >
          Felipe Rodrigues
        </a>
      </p>
    </div>
  );
}
