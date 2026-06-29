import { useContext } from "react";
import { ColorModeContextValue } from "./color-mode-context.interface";
import { ColorModeContext } from "./color-mode-context";

export const useColorModeContext = (): ColorModeContextValue => {
  const colorMode = useContext(ColorModeContext);

  if (!colorMode) {
    throw new Error(
      "useColorModeContext must be used within a ColorModeContextProvider"
    );
  }

  return colorMode;
};
