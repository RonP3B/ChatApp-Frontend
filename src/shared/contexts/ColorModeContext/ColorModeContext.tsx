import { createContext } from "react";
import { ColorModeContextValue } from "./ColorModeContextValue";

export const ColorModeContext = createContext<ColorModeContextValue | null>(
  null
);
