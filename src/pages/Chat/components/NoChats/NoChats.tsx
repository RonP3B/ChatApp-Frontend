import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NoChatsProps } from "./NoChatsProps";
import { noChatsStyles } from "./noChatsStyles";

export const NoChats: React.FC<NoChatsProps> = ({
  msg,
  chatSection,
  Icon,
  handleButton,
}) => {
  return (
    <Box sx={noChatsStyles.container}>
      <Icon sx={noChatsStyles.icon} />
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
          sx={noChatsStyles.btn}
          onClick={handleButton}
        >
          New chat
        </Button>
      )}
    </Box>
  );
};
