import { createContext } from "react";
import { ColorModeContextProps } from "./color-mode.context.interface";

export const ColorModeContext = createContext<ColorModeContextProps>({
  setMode: () => {},
  mode: "light",
});
