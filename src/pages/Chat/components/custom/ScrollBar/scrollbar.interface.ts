import { ReactNode } from "react";

export interface ScrollBarProps {
  children: ReactNode;
  customRef?: React.RefObject<HTMLDivElement | undefined>;
  sx?: object;
}
