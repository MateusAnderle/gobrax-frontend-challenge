import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import gobraxLogo from "../assets/gobrax_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDriverStore } from "../store";

interface HeaderProps {
  openForm: () => void;
}

export function Header({ openForm }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const driver = useDriverStore((state) => state.driver);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flex: 1,
              justifyContent: { xs: "space-between", md: "none" },
            }}
          >
            <Box width="30%">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => navigate("/")}>
                  <Typography textAlign="center" color="black">
                    Motoristas
                  </Typography>
                </MenuItem>

                <MenuItem onClick={() => navigate("/veiculos")}>
                  <Typography textAlign="center" color="black">
                    Veículos
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              display="flex"
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={gobraxLogo}
                alt={"Logotipo escrita Gobrax"}
                loading="eager"
                height="35px"
              />
            </Box>

            <Box width="30%" display="flex" justifyContent="flex-end">
              <Button color="primary" onClick={openForm}>
                <AddCircleIcon sx={{ height: 35, width: 35 }} />
              </Button>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Box display="flex" width={180} justifyContent="space-between">
              <Button
                onClick={() => navigate("/")}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  backgroundColor: location.pathname === "/" ? "lightGrey" : "",
                }}
              >
                <Typography
                  textTransform="none"
                  textAlign="center"
                  color="black"
                  fontWeight="bold"
                  fontSize="14px"
                >
                  Motoristas
                </Typography>
              </Button>

              <Button
                onClick={() => navigate("/veiculos")}
                sx={{
                  my: 2,
                  color: "black",
                  backgroundColor:
                    location.pathname === "/veiculos" ? "lightGrey" : "",
                }}
              >
                <Typography
                  textTransform="none"
                  textAlign="center"
                  color="black"
                  fontWeight="bold"
                  fontSize="14px"
                >
                  Veículos
                </Typography>
              </Button>
            </Box>

            <Box>
              <img
                src={gobraxLogo}
                alt={"Logotipo escrita Gobrax"}
                loading="eager"
                height="50px"
              />
            </Box>

            <Box display="flex" width={180} justifyContent="flex-end">
              <Button variant="contained" disableElevation onClick={openForm}>
                <Typography
                  textTransform="none"
                  textAlign="center"
                  color="White"
                  fontWeight="bold"
                  fontSize="14px"
                >
                  Cadastrar{" "}
                  {location.pathname === "/" ? "Motorista" : "Veículo"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {driver && (
        <Box
          display="flex"
          paddingTop={2}
          paddingRight={3}
          sx={{ justifyContent: { xs: "center", md: "end" } }}
        >
          <Box
            color="darkred"
            sx={{ textAlign: { xs: "center", md: "start" } }}
          >
            <Box marginBottom={1}>
              <Typography
                color="black"
                fontSize="14px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                Selecionado:
              </Typography>
            </Box>

            <Box
              display="flex"
              marginBottom={1}
              sx={{ justifyContent: { xs: "center", md: "end" } }}
            >
              <Typography
                color="black"
                fontWeight="bold"
                fontSize="14px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                Motorista:
              </Typography>
              &nbsp;
              <Typography
                color="black"
                fontSize="14px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                {driver.nome}
              </Typography>
            </Box>

            <Box
              display="flex"
              marginBottom={1}
              sx={{ justifyContent: { xs: "center", md: "start" } }}
            >
              <Typography
                color="black"
                fontWeight="bold"
                fontSize="14px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                Veículo:
              </Typography>
              &nbsp;
              <Typography
                color="black"
                fontSize="14px"
                sx={{ textAlign: { xs: "center", md: "start" } }}
              >
                {driver?.vinculo?.placa
                  ? driver.vinculo.placa
                  : "Não possui veículo"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </AppBar>
  );
}
