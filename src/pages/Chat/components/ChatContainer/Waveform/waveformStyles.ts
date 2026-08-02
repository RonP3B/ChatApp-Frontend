export const BAR_WIDTH = 3;
export const BAR_GAP = 2;

export const getWaveformStyles = (color: string) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: `${BAR_GAP}px`,
    flexGrow: 1,
    minWidth: 0,
    height: 24,
    overflow: "hidden",
  },

  bar: {
    flex: "1 1 0",
    borderRadius: "2px",
    backgroundColor: color,
    transition: "height 90ms linear",
  },
});
