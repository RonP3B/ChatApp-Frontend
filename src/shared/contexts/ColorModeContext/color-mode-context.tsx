import { createContext } from "react";
import { ColorModeContextValue } from "./color-mode-context.interface";

export const ColorModeContext = createContext<ColorModeContextValue | null>(
  null
);
