import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const colors = (mode) => ({
  ...(mode === "dark" ?
    {
      primary: {
        100: "#d5e7de",
        200: "#abcfbd",
        300: "#81b69b",
        400: "#579e7a",
        500: "#2d8659",
        600: "#246b47",
        700: "#1b5035",
        800: "#123624",
        900: "#091b12",
      },

     secondary: {
        100: "#d4f3f9",
        200: "#a9e7f4",
        300: "#7ddcee",
        400: "#52d0e9",
        500: "#27c4e3",
        600: "#1f9db6",
        700: "#177688",
        800: "#104e5b",
        900:  "#08272d"
      },
      error: {
        100: "#fbd4e4",
        200: "#f7a8c9",
        300: "#f27dad",
        400: "#ee5192",
        500: "#ea2677",
        600: "#bb1e5f",
        700: "#8c1747",
        800: "#5e0f30",
        900: "#2f0818",
      },

      info: {
        100: "#d6d5e5",
        200: "#adabcb",
        300: "#8482b1",
        400: "#5b5897",
        500: "#322e7d",
        600: "#282564",
        700: "#1e1c4b",
        800: "#141232",
        900: "#0a0919",
      },

      success: {
        100: "#cefbe5",
        200: "#9cf7ca",
        300: "#6bf4b0",
        400: "#39f095",
        500: "#08ec7b",
        600: "#06bd62",
        700: "#058e4a",
        800: "#035e31",
        900: "#022f19",
      },
    }
  : {
      primary: {
        100: "#091b12",
        200: "#123624",
        300: "#1b5035",
        400: "#246b47",
        500: "#2d8659",
        600: "#579e7a",
        700: "#81b69b",
        800: "#abcfbd",
        900: "#d5e7de",
      },

     secondary: {
        100:  "#08272d",
        200: "#104e5b",
        300: "#177688",
        400: "#1f9db6",
        500: "#27c4e3",
        600: "#52d0e9",
        700: "#7ddcee",
        800: "#a9e7f4",
        900: "#d4f3f9",
      },
      error: {
        100: "#2f0818",
        200: "#5e0f30",
        300: "#8c1747",
        400: "#bb1e5f",
        500: "#ea2677",
        600: "#ee5192",
        700: "#f27dad",
        800: "#f7a8c9",
        900: "#fbd4e4",
      },

      info: {
        100: "#0a0919",
        200: "#141232",
        300: "#1e1c4b",
        400: "#282564",
        500: "#322e7d",
        600: "#5b5897",
        700: "#8482b1",
        800: "#adabcb",
        900: "#d6d5e5",
      },
      success: {
        100: "#022f19",
        200: "#035e31",
        300: "#058e4a",
        400: "#06bd62",
        500: "#08ec7b",
        600: "#39f095",
        700: "#6bf4b0",
        800: "#9cf7ca",
        900: "#cefbe5",
      },
    }),
});

export const themeSettings = (mode) => {
  const color = colors(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === "dark" ?
        {
          // dark mode
          primary: {
            main: color.primary[500],
          },
          secondary: {
            main: color.secondary[500],
          },
          error: {
            main: color.error[400],
          },
          info: {
            dark: color.info[700],
            main: color.info[500],
            light: color.info[100],
          },
          success: {
            main: color.success[500],
          },         
        }
      : {
          // palette values for light mode
          primary: {
            main: color.primary[500],
          },
          secondary: {
            main: color.secondary[500],
          },
          error: {
            main: color.error[400],
          },
          neutral: {
            dark: color.info[700],
            main: color.info[500],
            light: color.info[100],
          },
          success: {
            main: color.success[500],
          },

          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  )

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return [theme, colorMode]
}


  