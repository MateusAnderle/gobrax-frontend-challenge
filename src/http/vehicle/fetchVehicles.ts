import api from "../api";

export async function fetchVehicles() {
  const response = await api.get("/veiculos");

  return response.data;
}
