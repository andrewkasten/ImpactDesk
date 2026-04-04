import { useState, useContext } from "react";
import { useTheme, Stack, Box, Tooltip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LetterAvatar from "./LetterAvatar";
import useSWR from "swr"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {ColorModeContext} from '../../../theme'

const settings = [
  { name: "Profile", id: "" },
  { name: "Logout", id: "logout" },
];

export default function MainNav() {
  const [menuPosition, setMenuPosition] = useState(null);
const colorMode = useContext(ColorModeContext)
  const theme = useTheme();

  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json())
    
  const { data: users } = useSWR(
    "http://localhost:8000/auth/users", fetcher
  )
  // console.log(users)
  const handleOpenUserMenu = (event) => {
    setMenuPosition(event.currentTarget)
  };

  const handleCloseUserMenu = () => {
    setMenuPosition(null);
  };

  return (
    <>
      <Box
      
        component="header"
        sx={{
          borderBottom: "1px solid var(--mui-palette-divider)",
          backgroundColor: "var(--mui-palette-background-paper)",    
          p: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: {xs: "start", md: "center", lg: "end"}, px: 2, minWidth:"100vh"}}
        >
           <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
           <Typography sx={{pr:2}} >{users?.first_name}</Typography>
            <Box>
              
             <Tooltip title="Open settings">
              
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <LetterAvatar letter={users?.first_name[0]}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                // anchorEl used to set position of menu
                anchorEl={menuPosition}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(menuPosition)}
                onClose={handleCloseUserMenu}
              >           
                {settings.map((setting) => (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link  to={setting.id} style={{ textDecoration: "none", color: "inherit" }}>
                      {setting.name}
                    </Link>
                  </MenuItem>
                ))}
                
              </Menu>
            </Box>
        </Stack>
      </Box>
    </>
  );
}
