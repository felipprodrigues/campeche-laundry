import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/laundry/Header";
import { BottomTabBar, type Tab } from "@/components/laundry/BottomTabBar";
import { WhatsAppCard } from "@/components/laundry/WhatsAppCard";
import { MachinesScreen } from "@/screens/MachinesScreen";
import { CalendarScreen } from "@/screens/CalendarScreen";
import { InfoScreen } from "@/screens/InfoScreen";

function App() {
  const [tab, setTab] = useState<Tab>("informacoes");

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-muted/40">
      <div className="flex-1 p-4 pb-6">
        <div className="mb-4">
          <Header tab={tab} />
        </div>
        <div key={tab} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
          {tab === "maquinas" && <MachinesScreen />}
          {tab === "calendario" && (
            <CalendarScreen onNavigateToMachines={() => setTab("maquinas")} />
          )}
          {tab === "informacoes" && <InfoScreen />}
        </div>
        <div className="mt-4">
          <WhatsAppCard />
        </div>
        <p className="mt-4 text-center text-[10px] text-muted-foreground/60">
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
      <BottomTabBar active={tab} onChange={setTab} />
      <Analytics />
    </div>
  );
}

export default App;
