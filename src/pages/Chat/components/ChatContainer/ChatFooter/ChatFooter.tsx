import { Fragment } from "react";
import { useChatFooter } from "./useChatFooter";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { chatFooterStyles } from "./chatFooterStyles";
import { HiddenInputFile } from "../HiddenInputFile/HiddenInputFile";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Fab,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";

export const ChatFooter = () => {
  const { chatFooterValues, chatFooterActions } = useChatFooter();

  return (
    <Box sx={chatFooterStyles.container}>
      <TextField
        name="message"
        value={chatFooterValues.textMsgToSend}
        onChange={chatFooterActions.handleInputChange}
        multiline
        fullWidth
        placeholder="Message"
        maxRows={10}
        slotProps={{
          input: {
            sx: chatFooterStyles.input,
            endAdornment: (
              <Fragment>
                <InputAdornment
                  position="end"
                  sx={chatFooterStyles.inputAdornment}
                >
                  <IconButton
                    color="primary"
                    id="attach-button"
                    aria-controls={
                      chatFooterValues.open ? "file-options" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={chatFooterValues.open ? "true" : undefined}
                    onClick={chatFooterActions.handleClick}
                  >
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
                <Menu
                  id="file-options"
                  anchorEl={chatFooterValues.anchorEl}
                  open={chatFooterValues.open}
                  onClose={chatFooterActions.handleClose}
                  slotProps={{ list: { "aria-labelledby": "attach-button" } }}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  {chatFooterValues.menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() =>
                        chatFooterActions.handleFileInputClick(item.text)
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.text}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </Fragment>
            ),
          },
        }}
      />
      <Fab
        color="primary"
        size="medium"
        sx={chatFooterStyles.sendBtn}
        disabled={chatFooterValues.disableButton}
        onClick={chatFooterActions.sendTextMessage}
      >
        <SendIcon color="secondary" />
      </Fab>
      {chatFooterValues.fileInputs.map(({ customRef, fileType }) => (
        <HiddenInputFile
          key={fileType}
          customRef={customRef}
          fileType={fileType}
        />
      ))}
    </Box>
  );
};
