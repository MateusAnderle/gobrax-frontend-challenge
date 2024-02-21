import api from "../api";

interface RemoveVehicleProps {
  id: string | undefined;
  path: string;
}

export async function removeVehicle({ id, path }: RemoveVehicleProps) {
  const response = await api.delete(`http://localhost:3000${path}/${id}`);

  return response.status;
}
