import api from "../api";

interface EditDriverProps {
  id: string;
  nome: string;
  documento: string;
  vinculo: string;
}

export async function editDriver({
  id,
  nome,
  documento,
  vinculo,
}: EditDriverProps) {
  const vehicle = await api.get(`/veiculos/${vinculo}`);

  const response = await api.put(`/motoristas/${id}`, {
    nome,
    documento,
    vinculo: vehicle.data,
  });

  return response.status;
}
