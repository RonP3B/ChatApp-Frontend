export const imageLightboxStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    outline: "none",
    pointerEvents: "none",
  },

  image: {
    maxWidth: "90vw",
    maxHeight: "90vh",
    borderRadius: "4px",
    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.5)",
    pointerEvents: "auto",
  },

  closeButton: {
    position: "fixed",
    top: 16,
    right: 16,
    color: "common.white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    pointerEvents: "auto",
    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
  },
};
