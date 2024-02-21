import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Driver, Vehicle } from "./DataTable";

interface RemoveDialogProps {
  open: boolean;
  onClose: () => void;
  location: string;
  data: Driver | Vehicle | null;
  submit: () => void;
}

export function RemoveDialog({
  open,
  onClose,
  location,
  data,
  submit,
}: RemoveDialogProps) {
  let dataDescription = "";

  if (data) {
    if ("nome" in data) {
      dataDescription = data.nome;
    } else if ("marca" in data) {
      dataDescription = data.marca;
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alerta-dialogo-titulo"
      aria-describedby="alerta-dialogo-descricao"
    >
      <DialogTitle id="alerta-dialogo-titulo">Remover</DialogTitle>
      <DialogContent>
        <DialogContentText id="alerta-dialogo-descricao">
          Você tem certeza que deseja remover o registro de{" "}
          {location === "/" ? "motorista" : "veículo"} -{dataDescription}? Essa
          ação não poderá ser desfeita
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <Button onClick={submit} autoFocus variant="contained">
          Tenho certeza!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
