import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import idLogo from "../../assets/id-logo.png";

const links = [
  { name: "Home", id: "/" },
  { name: "Features", id: "/dashboard" },
  { name: "About Us", id: "/aboutus" },
  { name: "Contact", id: "/contact" },
];

export default function Homenav() {
  const [menuPosition, setMenuPosition] = useState(null);

  const handleOpenUserMenu = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setMenuPosition(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            bgcolor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            boxShadow: 2,
            minHeight: "58px !important",
          }}>
          <img src={idLogo} alt="ImpactDesk logo" style={{ height: 48 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {links.map((page) => (
              <Button
                to={page.id}
                as={Link}
                variant="text"
                size="small"
                sx={{ minWidth: 0, textDecoration: "none" }}>
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}>
            <Button
              to="/login"
              as={Link}
              variant="text"
              size="small"
              sx={{ textDecoration: "none" }}>
              Login
            </Button>
            <Button
              to="/signup"
              as={Link}
              variant="contained"
              size="small"
              sx={{ textDecoration: "none" }}>
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1,  }}>
            <IconButton aria-label="Menu button" color="primary"onClick={handleOpenUserMenu}>
              {!menuPosition ?
                <MenuIcon />
              : <CloseIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuPosition}
              keepMounted
              open={Boolean(menuPosition)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
              }}
              transformOrigin={{
                horizontal: "center",
              }}>
              <Box sx={{ p: 1 }}>
                <MenuItem>Home</MenuItem>
                <MenuItem>Features</MenuItem>
                <MenuItem>About Us</MenuItem>
                <MenuItem>Contact</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button to="/signup" as={Link} variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button to="/login" as={Link} variant="outlined" fullWidth>
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
