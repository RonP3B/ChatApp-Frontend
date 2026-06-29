import { useState } from "react";
import { useColorMode } from "../contexts/ColorModeContext";

export const useDarkMode = () => {
  const { setMode, mode } = useColorMode();
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(
    mode === "dark"
  );

  const toggleDarkMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setIsDarkModeActive(newMode === "dark");
    setMode(newMode);
  };

  return { isDarkModeActive, toggleDarkMode };
};
