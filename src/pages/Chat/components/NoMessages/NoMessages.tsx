import { Box, Typography } from "@mui/material";
import { noMessagesStyles } from "./noMessagesStyles";
import UnsubscribeTwoToneIcon from "@mui/icons-material/UnsubscribeTwoTone";

export const NoMessages: React.FC = () => {
  return (
    <Box sx={noMessagesStyles.noMessagesContainer}>
      <UnsubscribeTwoToneIcon sx={noMessagesStyles.noMessagesIcon} />
      <Typography variant="h6" sx={noMessagesStyles.noMessagesTitle}>
        No messages here yet
      </Typography>
      <Typography variant="body2">
        Send a message to start the conversation
      </Typography>
    </Box>
  );
};
