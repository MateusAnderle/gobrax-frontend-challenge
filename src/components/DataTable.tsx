import { ReactNode, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/empty.json";
import { useDriverStore } from "../store";
import { fetchDrivers } from "../http/driver/fetchDrivers";
import { fetchVehicles } from "../http/vehicle/fetchVehicles";
import { removeDriver } from "../http/driver/removeDriver";
import { removeVehicle } from "../http/vehicle/removeVehicle";
import { RemoveDialog } from "./RemoveDialog";
import { EditModal } from "./EditModal";

interface DataTableProps {
  children: ReactNode;
}

export interface Driver {
  id: string;
  nome: string;
  documento: string;
  vinculo: Vehicle | null;
}

export interface Vehicle {
  id: string;
  marca: string;
  placa: string;
}

interface DriverListProps {
  data: Driver[];
}

interface VehiclesListProps {
  data: Vehicle[];
}

export function DataTable({ children }: DataTableProps) {
  const location = useLocation();
  const [dataList, setDataList] = useState<Driver[] | Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dataToRemove, setDataToRemove] = useState<Driver | Vehicle | null>(
    null
  );
  const [dataToEdit, setDataToEdit] = useState<Driver | Vehicle | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const setDriver = useDriverStore((state) => state.setDriver);
  const driver = useDriverStore((state) => state.driver);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleRemoveItem = async () => {
    try {
      if (location.pathname === "/") {
        await removeDriver({ id: dataToRemove?.id, path: "/motoristas" });
      } else {
        await removeVehicle({ id: dataToRemove?.id, path: location.pathname });
      }
      navigate(0);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEditModal = (selectedToEdit: Driver | Vehicle) => {
    setDataToEdit(selectedToEdit);
    setOpenEditModal(true);
  };

  const handleOpenDialog = (selectedToRemove: Driver | Vehicle) => {
    setDataToRemove(selectedToRemove);
    setOpenDialog(true);
  };

  const hendleCloseDialog = () => {
    setDataToRemove(null);
    setOpenDialog(false);
  };

  const handleRowClick = (selectedRow: Driver) => {
    setDriver(selectedRow.id === driver?.id ? null : selectedRow);
  };

  const DriversList = ({ data }: DriverListProps) => {
    return (
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "#e0e0e0", borderRadius: "6px" }}
      >
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Documento</TableCell>
              <TableCell align="left">Vínculo</TableCell>
              <TableCell align="center" width={30}>
                Editar
              </TableCell>
              <TableCell align="center" width={30}>
                Remover
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="default"
                    indeterminate={false}
                    checked={driver?.id === row.id}
                    onChange={() => handleRowClick(row)}
                    inputProps={{
                      "aria-label": "Selecione um motorista",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.nome}</TableCell>
                <TableCell align="left">{row.documento}</TableCell>
                <TableCell align="left">
                  {row.vinculo?.marca ? "Sim" : "Não"}{" "}
                </TableCell>
                <TableCell align="center" width={30}>
                  <Button
                    color="inherit"
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="center" width={30}>
                  <Button color="inherit" onClick={() => handleOpenDialog(row)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const VehiclesList = ({ data }: VehiclesListProps) => {
    return (
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "#e0e0e0", borderRadius: "6px" }}
      >
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Marca</TableCell>
              <TableCell align="left">Placa</TableCell>
              <TableCell align="center" width={30}>
                Editar
              </TableCell>
              <TableCell align="center" width={30}>
                Remover
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.marca}</TableCell>
                <TableCell align="left">{row.placa}</TableCell>
                <TableCell align="center" width={30}>
                  <Button
                    color="inherit"
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="center" width={30}>
                  <Button color="inherit" onClick={() => handleOpenDialog(row)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (location.pathname === "/") {
          const drivers = await fetchDrivers();
          setDataList(drivers);
        } else {
          const vehicles = await fetchVehicles();
          setDataList(vehicles);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [location.pathname]);

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 150,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  ) : (
    <Container>
      {dataList.length === 0 ? (
        <Box
          display="flex"
          padding={5}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Lottie options={defaultOptions} height={400} width={400} />
          <Typography
            id="empty-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            Nenhum registro encontrado
          </Typography>
          <Typography id="empty-subtitle" fontSize="16px" mt={3}>
            Aproveite para cadastrar um novo{" "}
            {location.pathname === "/" ? "motorista" : "veículo"}!
          </Typography>
        </Box>
      ) : (
        <Box paddingTop={3}>
          {location.pathname === "/" ? (
            <DriversList data={dataList as Driver[]} />
          ) : (
            <VehiclesList data={dataList as Vehicle[]} />
          )}
        </Box>
      )}

      {children}

      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        location={location.pathname}
        data={dataToEdit}
      />

      <RemoveDialog
        open={openDialog}
        onClose={hendleCloseDialog}
        location={location.pathname}
        data={dataToRemove}
        submit={handleRemoveItem}
      />
    </Container>
  );
}
