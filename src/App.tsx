import { useState } from "react";
import { Header } from "@/components/laundry/Header";
import { BottomTabBar, type Tab } from "@/components/laundry/BottomTabBar";
import { MachinesScreen } from "@/screens/MachinesScreen";
import { CalendarScreen } from "@/screens/CalendarScreen";
import { InfoScreen } from "@/screens/InfoScreen";

function App() {
  const [tab, setTab] = useState<Tab>("maquinas");

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-muted/40">
      <div className="flex-1 p-4 pb-6">
        <div className="mb-4">
          <Header />
        </div>
        {tab === "maquinas" && <MachinesScreen />}
        {tab === "calendario" && <CalendarScreen />}
        {tab === "informacoes" && <InfoScreen />}
      </div>
      <BottomTabBar active={tab} onChange={setTab} />
    </div>
  );
}

export default App;
