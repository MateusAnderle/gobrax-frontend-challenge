import { useState } from "react";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { DataTable } from "../components/DataTable";
import { Header } from "../components/Header";
import { FormModal } from "../components/FormModal";
import { registerVehicle } from "../http/vehicle/registerVehicle";
import { useNavigate } from "react-router-dom";

export function Vehicles() {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await registerVehicle({
        marca: brand,
        placa: plate,
      });
      navigate(0);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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
            Cadastro de veículo
          </Typography>

          <Box display="flex" width="100%" flexDirection="column" mt={3}>
            <TextField
              id="brand"
              label="Digite a marca do veículo"
              size="small"
              variant="outlined"
              required
              value={brand}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBrand(event.target.value);
              }}
            />
          </Box>
          <Box display="flex" width="100%" flexDirection="column" my={3}>
            <TextField
              id="plate"
              label="Digite a placa do veículo"
              size="small"
              variant="outlined"
              required
              value={plate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPlate(event.target.value);
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!brand || !plate}
          >
            Cadastrar veículo
          </Button>
        </FormModal>
      </DataTable>
    </Container>
  );
}
