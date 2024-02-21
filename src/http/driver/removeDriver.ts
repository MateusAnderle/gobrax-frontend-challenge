import api from "../api";

interface RemoveDriverProps {
  id: string | undefined;
  path: string;
}

const baseURL = import.meta.env.VITE_HOST;

export async function removeDriver({ id, path }: RemoveDriverProps) {
  const response = await api.delete(`${baseURL}${path}/${id}`);

  return response.status;
}
