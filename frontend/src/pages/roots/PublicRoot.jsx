import { Outlet } from "react-router-dom";
import Homenav from "../../components/navbars/Homenav"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {ColorModeContext, useMode} from '../../../theme'


function Root() {
  const [theme, colorMode] = useMode()

  return (
    <>
        {!localStorage.getItem("token") ? (
          <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
          <div>
        <Homenav />
        <Outlet />
        </div>
        </ThemeProvider>
        </ColorModeContext.Provider>
        ) : (
        <></>
        )}
    </>
  );
}

export default Root;
