import api from "../api";

interface RegisterDriverProps {
  nome: string;
  documento: string;
  vinculo: string;
}

export async function registerDriver({
  nome,
  documento,
  vinculo,
}: RegisterDriverProps) {
  const vehicle = await api.get(`/veiculos/${vinculo}`);

  await api.post("/motoristas", {
    nome,
    documento,
    vinculo: vehicle.data,
  });
}
