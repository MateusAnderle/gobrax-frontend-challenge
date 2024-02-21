import api from "../api";

interface RemoveVehicleProps {
  id: string | undefined;
  path: string;
}

const baseURL = import.meta.env.VITE_HOST;

export async function removeVehicle({ id, path }: RemoveVehicleProps) {
  const response = await api.delete(`${baseURL}${path}/${id}`);

  return response.status;
}
