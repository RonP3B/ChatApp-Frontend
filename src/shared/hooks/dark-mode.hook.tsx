import { useState } from "react";
import { useColorModeContext } from "../contexts/ColorModeContext";

export const useDarkMode = () => {
  const { setMode, mode } = useColorModeContext();
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
