export const getAudioPlayerStyles = (color: string) => ({
  container: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.5,
    width: 210,
    marginTop: "6px",
  },

  playButton: {
    padding: "4px",
    color,
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: color,
  },

  icon: {
    fontSize: "1.3rem",
  },

  slider: {
    mx: 0.5,
    padding: "10px 0 !important",

    "& .MuiSlider-thumb": {
      width: 10,
      height: 10,
      backgroundColor: color,
      boxShadow: "none",

      "&:hover, &.Mui-focusVisible, &.Mui-active": {
        boxShadow: "none",
      },
    },

    "& .MuiSlider-track": {
      backgroundColor: color,
      border: "none",
    },

    "& .MuiSlider-rail": {
      backgroundColor: color,
      opacity: 0.3,
    },
  },

  time: {
    color,
    fontSize: "0.68rem",
    minWidth: 30,
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },
});
