import { useLayoutEffect, useRef, useState } from "react";
import { BAR_WIDTH, BAR_GAP } from "./waveformStyles";

const BAR_FOOTPRINT = BAR_WIDTH + BAR_GAP;

export const useWaveform = (levels: number[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleBarCount, setVisibleBarCount] = useState<number>(0);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateBarCount = (width: number): void => {
      setVisibleBarCount(Math.max(1, Math.floor(width / BAR_FOOTPRINT)));
    };

    updateBarCount(container.getBoundingClientRect().width);

    const observer = new ResizeObserver(([entry]) => {
      updateBarCount(entry.contentRect.width);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const visibleLevels = levels.slice(-visibleBarCount);

  return { containerRef, visibleLevels };
};
