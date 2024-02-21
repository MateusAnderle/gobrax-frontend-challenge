import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { DataTable, Vehicle } from "../components/DataTable";
import { Header } from "../components/Header";
import { FormModal } from "../components/FormModal";
import { useEffect, useState } from "react";
import { registerDriver } from "../http/driver/registerDriver";
import { fetchVehicles } from "../http/vehicle/fetchVehicles";
import { useNavigate } from "react-router-dom";

export function Drivers() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [vehiclesOptions, setVehiclesOptions] = useState<Vehicle[]>([]);
  const [document, setDocument] = useState<string>("");
  const [vehicleSelected, setVehicleSelected] = useState<string>("");
  const navigate = useNavigate();

  const handleChangeVehicle = (event: SelectChangeEvent) => {
    setVehicleSelected(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await registerDriver({
        nome: name,
        documento: document,
        vinculo: vehicleSelected,
      });
      navigate(0);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const vehicles = await fetchVehicles();
      setVehiclesOptions(vehicles);
    }

    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Container maxWidth="lg">
      <Header openForm={() => setOpen(true)} />
      <DataTable>
        <FormModal open={open} setOpen={setOpen}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            Cadastro de motorista
          </Typography>

          <Box display="flex" width="100%" flexDirection="column" mt={3}>
            <TextField
              id="name"
              label="Digite o nome do motorista"
              size="small"
              variant="outlined"
              required
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </Box>
          <Box display="flex" width="100%" flexDirection="column" my={3}>
            <TextField
              id="identifier"
              label="Digite o número do documento do motorista"
              size="small"
              type="number"
              variant="outlined"
              required
              value={document}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDocument(event.target.value);
              }}
            />
          </Box>
          <Box display="flex" width="100%" flexDirection="column" mb={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="vehicle-select">Selecione um veículo</InputLabel>
              <Select
                id="vehicle-select"
                labelId="vehicle-select-label"
                value={vehicleSelected}
                onChange={handleChangeVehicle}
                label="Selecione um veículo"
                defaultValue=""
                disabled={vehiclesOptions.length <= 0}
              >
                {vehiclesOptions.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.marca} | {vehicle.placa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!name || !document}
          >
            Cadastrar motorista
          </Button>
        </FormModal>
      </DataTable>
    </Container>
  );
}
