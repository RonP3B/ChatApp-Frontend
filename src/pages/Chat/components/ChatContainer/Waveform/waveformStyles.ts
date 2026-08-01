export const getWaveformStyles = (color: string) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    flexGrow: 1,
    height: 24,
  },

  bar: {
    flex: "1 1 0",
    minWidth: "2px",
    maxWidth: "4px",
    borderRadius: "2px",
    backgroundColor: color,
    transition: "height 90ms linear",
  },
});
