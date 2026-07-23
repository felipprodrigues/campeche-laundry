import {
  AlertTriangle,
  Box,
  CalendarClock,
  CigaretteOff,
  Home,
  Info,
  PawPrint,
  Recycle,
  Shirt,
  ShoppingBag,
  Toilet,
  Trash2,
  Truck,
  Users,
  VolumeX,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InfoRow } from "@/components/laundry/InfoRow";

export function InfoScreen() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-l-4 border-l-indigo-400 dark:border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <VolumeX className="size-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
            Silêncio
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InfoRow icon={CalendarClock} color="indigo">
            <strong className="text-foreground">Seg. a Sex.:</strong> 22h às 7h
          </InfoRow>
          <Separator />
          <InfoRow icon={CalendarClock} color="indigo">
            <strong className="text-foreground">Sáb. e Dom.:</strong> 22h às 8h
          </InfoRow>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-400 dark:border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="size-5 shrink-0 text-orange-600 dark:text-orange-400" />
            Lixo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InfoRow icon={CalendarClock} color="orange" label="Dias da coleta">
            Segundas, Quartas e Sextas.
          </InfoRow>
          <Separator />
          <InfoRow icon={Trash2} color="orange" label="Horário">
            Contentores na calçada até 16h.
          </InfoRow>
          <Separator />
          <InfoRow icon={ShoppingBag} color="orange" label="Importante">
            Utilize sempre sacos pretos.
          </InfoRow>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-teal-400 dark:border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />
            Convivência
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InfoRow icon={Box} color="teal">
            <strong className="text-foreground">Objetos:</strong> não deixe objetos em frente ao
            apartamento.
          </InfoRow>
          <Separator />
          <InfoRow icon={Users} color="teal">
            <strong className="text-foreground">Visitantes:</strong> cada morador é responsável
            pela conduta de seus visitantes.
          </InfoRow>
          <Separator />
          <InfoRow icon={PawPrint} color="teal">
            <strong className="text-foreground">Áreas comuns:</strong> não é permitida a
            permanência de animais de estimação ou bens pessoais.
          </InfoRow>
          <Separator />
          <InfoRow icon={Shirt} color="teal">
            <strong className="text-foreground">Varais:</strong> permitidos apenas varais de chão
            dentro do apartamento.
          </InfoRow>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-sky-400 dark:border-l-sky-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="size-5 shrink-0 text-sky-600 dark:text-sky-400" />
            Mudanças e carga/descarga
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InfoRow icon={CalendarClock} color="sky" label="Horário">
            <strong className="text-foreground">Seg. a Sáb.:</strong> 8h às 20h
          </InfoRow>
          <Separator />
          <InfoRow icon={Info} color="sky" label="Importante">
            Não permitidas aos domingos e feriados.
          </InfoRow>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-400 dark:border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
            Proibições
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InfoRow icon={CigaretteOff} color="red">
            <strong className="text-foreground">Cigarros pela janela:</strong> proibido atirar
            fósforos, pontas de cigarro ou quaisquer objetos pelas portas e janelas.
          </InfoRow>
          <Separator />
          <InfoRow icon={Toilet} color="red">
            <strong className="text-foreground">Entupimentos:</strong> não coloque em vasos
            sanitários, pias e tanques objetos que possam causar entupimento.
          </InfoRow>
        </CardContent>
      </Card>
    </div>
  );
}
