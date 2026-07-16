import { useContext } from "react";
import { ColorModeContextValue } from "./ColorModeContextValue";
import { ColorModeContext } from "./ColorModeContext";

export const useColorMode = (): ColorModeContextValue => {
  const colorMode = useContext(ColorModeContext);

  if (!colorMode) {
    throw new Error(
      "useColorMode must be used within a ColorModeContextProvider"
    );
  }

  return colorMode;
};
