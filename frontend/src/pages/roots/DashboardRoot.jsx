import { Navigate, Outlet } from "react-router-dom";
import Sidenav from "../../components/navbars/Sidenav";
import Box from "@mui/material/Box";
import MainNav from "../../components/navbars/MainNav";
import { SWRConfig } from "swr";
import Bottomnav from "../../components/navbars/Bottomnav";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {ColorModeContext, useMode} from '../../../theme'
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";


function DashboardLayout() {
  const [theme, colorMode] = useMode()
  const { userToken } = useContext(AuthContext)

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
     <ColorModeContext.Provider value={colorMode}>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
        // normal RESTful APIs with JSON data, fetcher function, a wrapper of fetch:
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: "stretch",
            minHeight: "100vh",
           }}
        >
          <Box sx={{ display: {xs: "none", sm: "none", md: "flex"} }}> <Sidenav/></Box>
       
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 1, md: 2 },
              borderLeft: 2,
              borderColor: "divider",
              minWidth: 0,
            }}
          >
            <>
              <MainNav />
              <Outlet />
              <Box sx={{ display: {xs: "inline-table", sm: "inline-flex", md: "none"} }}>
                <Bottomnav />
              </Box>
            </>
          </Box>
        </Box>
      </SWRConfig>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default DashboardLayout;
