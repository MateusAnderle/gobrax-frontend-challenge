import { Routes, Route } from "react-router-dom";
import { Drivers } from "../pages/Drivers";
import { Vehicles } from "../pages/Vehicles";

export function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Drivers />} />
      <Route path="/veiculos" element={<Vehicles />} />
    </Routes>
  );
}
