import { nanoid } from "nanoid";
import { Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChatSidebarHeaderStyles } from "./chat-sidebar-header.styles";
import { ChatSidebarHeaderProps } from "./chat-sidebar-header.interface";
import { NewChat, NewGroupChat } from "../../dialogs";
import {
  Box,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";

export const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({
  chatSidebarHeaderValues,
  chatSidebarHeaderActions,
}) => {
  return (
    <Toolbar disableGutters sx={ChatSidebarHeaderStyles.toolbarPadding}>
      <Box>
        <IconButton
          id="menu-button"
          aria-controls={
            chatSidebarHeaderValues.open ? "options-button" : undefined
          }
          aria-haspopup="true"
          aria-expanded={chatSidebarHeaderValues.open ? "true" : undefined}
          onClick={chatSidebarHeaderActions.handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="options-button"
          anchorEl={chatSidebarHeaderValues.anchorEl}
          open={chatSidebarHeaderValues.open}
          onClose={chatSidebarHeaderActions.handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          {chatSidebarHeaderValues.menuItems.map((item) => (
            <MenuItem key={nanoid()} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
              {item.darkMode && (
                <Switch
                  id="dark-mode-switch"
                  checked={chatSidebarHeaderValues.isDarkModeActive}
                />
              )}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <TextField
        value={chatSidebarHeaderValues.filterChat}
        onChange={chatSidebarHeaderActions.handleChatFilter}
        sx={ChatSidebarHeaderStyles.spacing}
        placeholder="Filter chat"
        fullWidth
        InputProps={{
          sx: ChatSidebarHeaderStyles.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: chatSidebarHeaderValues.filterChat && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={chatSidebarHeaderActions.clearChatFilter}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <NewChat
        open={chatSidebarHeaderValues.newChatDialogOpened}
        handleClose={chatSidebarHeaderActions.closeNewChatDialog}
      />
      <NewGroupChat
        open={chatSidebarHeaderValues.newGroupChatDialogOpened}
        handleClose={chatSidebarHeaderActions.closeNewGroupChatDialog}
      />
    </Toolbar>
  );
};
