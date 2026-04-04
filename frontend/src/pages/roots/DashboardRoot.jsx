import { Outlet } from "react-router-dom";
import Sidenav from "../../components/navbars/Sidenav";
import { Box } from "@mui/material";
import MainNav from "../../components/navbars/MainNav";
import Homenav from "../../components/navbars/Homenav";
import { SWRConfig } from "swr";
import Bottomnav from "../../components/navbars/Bottomnav";

import {CssBaseline, ThemeProvider} from "@mui/material"
import {ColorModeContext, useMode} from '../../../theme'


function DashboardLayout() {
  const [theme, colorMode] = useMode()

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
            {localStorage.getItem("token") ? (
              <>
                <MainNav />
                <Outlet />
                <Box sx={{ display: {xs: "inline-table", sm: "inline-flex", md: "none"} }}>
                <Bottomnav />
                </Box>
              </>
            ) : (
              <>
                <Homenav />
                <h2>You must be logged in</h2>
              </>
            )}
          </Box>
        </Box>
      </SWRConfig>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default DashboardLayout;
