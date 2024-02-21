import { Theme } from "@mui/material/styles";

export const getMessageStyles = (isLoggedUser: boolean, error: boolean) => {
  const flexDirection = !isLoggedUser ? "row" : "row-reverse";
  const backgroundColor = !isLoggedUser ? "secondary.main" : "primary.main";

  return {
    mainContainer: {
      display: "flex",
      flexDirection,
      alignItems: "flex-end",
      mb: 1,
      mx: 2,
      opacity: error ? 0.8 : 1,
    },

    avatar: {
      width: 32,
      height: 32,
      mt: 0.5,
      border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
      mr: !isLoggedUser ? 0.5 : 0,
      ml: isLoggedUser ? 0.5 : 0,
    },

    avatarTriangle: {
      "&::before": {
        content: '""',
        position: "absolute",
        backgroundColor: backgroundColor,
        width: "12px",
        height: "20px",
        clipPath: !isLoggedUser
          ? "polygon(0 100%, 100% 100%, 100% 0)"
          : "polygon(0 0, 100% 100%, 0 100%)",
        transform: `translateY(-80%)`,
        left: !isLoggedUser ? "40px" : "auto",
      },
    },

    messagePaper: {
      paddingX: 1,
      paddingY: 0.5,
      maxWidth: "70%",
      wordWrap: "break-word",
      borderRadius: "15px",
      backgroundColor: backgroundColor,
      color: !isLoggedUser ? "inherit" : "primary.main",
      position: "relative",
    },

    textColor: {
      color: isLoggedUser ? "secondary.main" : "black",
    },

    time: {
      fontSize: "0.7rem",
      textAlign: "right",
      color: isLoggedUser ? "secondary.main" : "black",
    },

    messageMedia: {
      maxWidth: "100%",
      borderRadius: "10px",
      marginTop: "8px",
      maxHeight: 270,
      minHeight: 100,
      border: "5px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    },

    messageAudio: {
      maxWidth: "100%",
      marginTop: "8px",
    },
  };
};
