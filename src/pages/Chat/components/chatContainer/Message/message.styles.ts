import { Theme } from "@mui/material/styles";

// Base dimensions for the media placeholder (see message.hook.tsx).
// Kept as named constants so the placeholder height and the actual
// media box styles are derived from the same numbers and can't drift apart.
export const MEDIA_MAX_HEIGHT = 270;
export const MEDIA_MIN_HEIGHT = 100;
export const MEDIA_BORDER_WIDTH = 5;
export const MEDIA_MARGIN_TOP = 8;

// Worst-case height the image/video box can occupy once loaded.
// boxSizing: "border-box" on messageMedia already folds the border into
// maxHeight, so only marginTop (which always sits outside the box model,
// regardless of box-sizing) needs to be added on top. boxShadow is a paint
// effect only — it never affects layout — so it's excluded.
export const MEDIA_PLACEHOLDER_HEIGHT = MEDIA_MAX_HEIGHT + MEDIA_MARGIN_TOP;

export const MessageStyles = {
  messageMedia: {
    boxSizing: "border-box",
    maxWidth: "100%",
    borderRadius: "10px",
    marginTop: `${MEDIA_MARGIN_TOP}px`,
    maxHeight: MEDIA_MAX_HEIGHT,
    minHeight: MEDIA_MIN_HEIGHT,
    border: `${MEDIA_BORDER_WIDTH}px solid rgba(0, 0, 0, 0.2)`,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },

  messageAudio: {
    maxWidth: "100%",
    marginTop: "8px",
  },

  errorText: {
    color: "darkred",
  },
};

// Placeholder wrapper for IMAGE/VIDEO messages. Reserves mediaHeight
// (worst-case) before load, then collapses to the media's natural size
// (bounded by minHeight/maxHeight above) once handleMediaLoad fires.
export const getMediaPlaceholderStyles = (height?: number) => ({
  display: "block",
  height,
});

export const getDynamicMessageStyles = (
  isLoggedUser: boolean,
  error: boolean
) => {
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
  };
};
