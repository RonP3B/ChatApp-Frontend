export const getAudioPlayerStyles = (color: string) => ({
  container: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.5,
    width: "clamp(130px, 48vw, 210px)",
    marginTop: "2px",
    "@media (max-width: 278px)": {
      width: 100,
    },
  },

  playButton: {
    padding: "2px",
    color,
    flexShrink: 0,
  },

  icon: {
    fontSize: { xs: "1.8rem", sm: "1.9rem", md: "2rem" },
  },

  slider: {
    color,
    mx: 0.5,
    flexGrow: 1,
    minWidth: 0,

    "& .MuiSlider-thumb": {
      width: 10,
      height: 10,
      backgroundColor: color,
      boxShadow: "none",
      "&:hover, &.Mui-focusVisible, &.Mui-active": { boxShadow: "none" },
    },
    "& .MuiSlider-track": { backgroundColor: color, border: "none" },
    "& .MuiSlider-rail": { backgroundColor: color, opacity: 0.3 },
  },

  time: {
    color,
    fontSize: "0.68rem",
    minWidth: 30,
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
    flexShrink: 0,
  },
});
