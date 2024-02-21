import api from "../api";

interface RegisterDriverProps {
  marca: string;
  placa: string;
}

export async function registerVehicle({ marca, placa }: RegisterDriverProps) {
  await api.post("/veiculos", {
    marca,
    placa,
  });
}
