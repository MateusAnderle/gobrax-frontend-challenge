import api from "../api";

interface RemoveDriverProps {
  id: string | undefined;
  path: string;
}

export async function removeDriver({ id, path }: RemoveDriverProps) {
  const response = await api.delete(`http://localhost:3000${path}/${id}`);

  return response.status;
}
