import { useEffect, useState } from "react";
import { getSaoPauloNow, type SaoPauloNow } from "@/lib/time";

export function useNow(): SaoPauloNow {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return getSaoPauloNow(now);
}
