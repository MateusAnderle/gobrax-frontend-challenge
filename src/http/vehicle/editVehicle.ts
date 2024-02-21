import api from "../api";

interface EditVehicleProps {
  id: string;
  marca: string;
  placa: string;
}

export async function editVehicle({ id, marca, placa }: EditVehicleProps) {
  const response = await api.put(`/veiculos/${id}`, {
    marca,
    placa,
  });

  return response.status;
}
