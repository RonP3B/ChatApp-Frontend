import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NoChatsProps } from "./no-chats.interface";
import { NoChatsStyles } from "./no-chats.styles";

export const NoChats: React.FC<NoChatsProps> = ({
  msg,
  chatSection,
  Icon,
  handleButton,
}) => {
  return (
    <Box sx={NoChatsStyles.container}>
      <Icon sx={NoChatsStyles.icon} />
      <Typography variant="h6">{msg}</Typography>
      {chatSection && (
        <Typography variant="subtitle1">
          Select from your existing conversations to start chatting
        </Typography>
      )}
      {!chatSection && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={NoChatsStyles.btn}
          onClick={handleButton}
        >
          New chat
        </Button>
      )}
    </Box>
  );
};
