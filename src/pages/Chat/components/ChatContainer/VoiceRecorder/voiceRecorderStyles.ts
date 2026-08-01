import { keyframes } from "@mui/material/styles";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

export const voiceRecorderStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    minWidth: 0,
    gap: 1,
    height: "56px",
    paddingX: 1.5,
    borderRadius: "25px",
    backgroundColor: "background.paper",
  },

  deleteButton: {
    color: "text.secondary",
    flexShrink: 0,
  },

  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexGrow: 1,
    minWidth: 0,
    overflow: "hidden",
  },

  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "error.main",
    animation: `${blink} 1.2s ease-in-out infinite`,
    flexShrink: 0,
  },

  time: {
    minWidth: 32,
    fontVariantNumeric: "tabular-nums",
    color: "text.secondary",
    flexShrink: 0,
  },
};
