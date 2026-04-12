import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import Homenav from "../../components/navbars/Homenav"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {ColorModeContext, useMode} from '../../../theme'
import AuthContext from "../../contexts/AuthContext";


function Root() {
  const [theme, colorMode] = useMode()
  const { userToken } = useContext(AuthContext)

  if (userToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Homenav />
            <Outlet />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default Root;
