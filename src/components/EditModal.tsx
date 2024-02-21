import { useEffect, useState } from "react";

import { Driver, Vehicle } from "./DataTable";
import { fetchVehicles } from "../http/vehicle/fetchVehicles";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { editDriver } from "../http/driver/editDriver";
import { editVehicle } from "../http/vehicle/editVehicle";
import { useNavigate } from "react-router-dom";

interface EditModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  location: string;
  data: Driver | Vehicle | null;
}

export function EditModal({ open, setOpen, location, data }: EditModalProps) {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [vehicleSelected, setVehicleSelected] = useState("");
  const [vehiclesOptions, setVehiclesOptions] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  const handleChangeVehicle = (event: SelectChangeEvent) => {
    setVehicleSelected(event.target.value);
  };

  const handleEditItem = async () => {
    try {
      if (location === "/") {
        await editDriver({
          id: data!.id,
          nome: name,
          documento: document,
          vinculo: vehicleSelected,
        });
      } else {
        await editVehicle({
          id: data!.id,
          marca: name,
          placa: document,
        });
      }
      setOpen(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const vehicles = await fetchVehicles();
      setVehiclesOptions(vehicles);
    }

    if (open && data && "nome" in data) {
      setName(data.nome);
      setDocument(data.documento);
      setVehicleSelected(data.vinculo?.id || "");
      fetchData();
    } else if (open && data && "marca" in data) {
      setName(data.marca);
      setDocument(data.placa);
      setVehicleSelected("");
      fetchData();
    }
  }, [open, data]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "70%", md: 500 },
          bgcolor: "background.paper",
          borderRadius: 2,
          paddingX: 6,
          paddingY: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          fontWeight="bold"
        >
          Edição de registro
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
        {location === "/" && (
          <Box display="flex" width="100%" flexDirection="column" mb={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="vehicle-select">Selecione um veículo</InputLabel>
              <Select
                id="vehicle-select"
                labelId="vehicle-select-label"
                value={vehicleSelected}
                onChange={handleChangeVehicle}
                label="Selecione um veículo"
              >
                {vehiclesOptions?.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.marca} | {vehicle.placa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleEditItem}
          disabled={!name || !document}
        >
          Confirmar edição
        </Button>
      </Box>
    </Modal>
  );
}
