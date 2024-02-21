import api from "../api";

export async function fetchDrivers() {
  const response = await api.get("/motoristas");

  return response.data;
}
