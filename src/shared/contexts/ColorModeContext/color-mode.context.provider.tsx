import { useState, useMemo, ReactNode, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "./color-mode.context";

export const ColorModeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const storedMode = localStorage.getItem("mode");
    return (
      (storedMode as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => localStorage.setItem("mode", mode), [mode]);

  const colorMode = useMemo(() => ({ setMode, mode }), [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: mode === "light" ? "#ff647c" : "#d85468" },
          secondary: { main: mode === "light" ? "#dceaef" : "#b9c4c8" },
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
