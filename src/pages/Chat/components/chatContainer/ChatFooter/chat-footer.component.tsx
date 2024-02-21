import { Fragment } from "react";
import { useChatFooter } from "./chat-footer.hook";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { nanoid } from "nanoid";
import { ChatFooterStyles } from "./chat-footer.styles";
import { HiddenInputFile } from "../HiddenInputFile/hidden-input-file.component";
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

export const ChatFooter: React.FC = () => {
  const { chatFooterValues, chatFooterActions } = useChatFooter();

  return (
    <Box sx={ChatFooterStyles.container}>
      <TextField
        name="message"
        value={chatFooterValues.msgToSend}
        onChange={chatFooterActions.handleInputChange}
        multiline
        fullWidth
        placeholder="Message"
        maxRows={10}
        InputProps={{
          sx: ChatFooterStyles.input,
          endAdornment: (
            <Fragment>
              <InputAdornment position="end">
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
                MenuListProps={{ "aria-labelledby": "attach-button" }}
                anchorOrigin={chatFooterValues.menuOrigin.anchorOrigin}
                transformOrigin={chatFooterValues.menuOrigin.transformOrigin}
              >
                {chatFooterValues.menuItems.map((item) => (
                  <MenuItem
                    key={nanoid()}
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
        }}
      />
      <Fab
        color="primary"
        size="medium"
        sx={ChatFooterStyles.sendBtn}
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
