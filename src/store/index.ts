import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

interface Vehicle {
  id: string;
  marca: string;
  placa: string;
}

interface Driver {
  id: string;
  nome: string;
  documento: string;
  vinculo: Vehicle | null;
}

interface DriverStore {
  driver: Driver | null;
  setDriver: (driver: Driver | null) => void;
}

type MyPersist = (
  config: StateCreator<DriverStore>,
  options: PersistOptions<DriverStore, Partial<DriverStore>>
) => StateCreator<DriverStore>;

const useDriverStore = create<DriverStore>(
  (persist as MyPersist)(
    (set) => ({
      driver: null,
      setDriver: (driver) => set({ driver }),
    }),
    {
      name: "gobrax-challenge-storage",
    }
  )
);

export { useDriverStore };
