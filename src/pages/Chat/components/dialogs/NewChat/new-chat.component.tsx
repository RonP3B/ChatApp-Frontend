import { SubmitButton } from "@/shared/components/formElements";
import { ScrollBar } from "../../custom";
import { useNewChat } from "./new-chat.hook";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { newChatStyles } from "./new-chat.styles";
import { UserNotFound } from "../../feedback";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  LinearProgress,
  ListItem,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const NewChat: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const { newChatValues, newChatActions } = useNewChat(handleClose);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: newChatStyles.dialogContainer }}
    >
      <DialogTitle>New Chat</DialogTitle>
      <Divider />
      <ScrollBar>
        <DialogContent sx={newChatStyles.dialogContent}>
          <Box>
            <TextField
              value={newChatValues.usernameFilter}
              onChange={newChatActions.handleInputChange}
              placeholder="Search users"
              autoComplete="off"
              margin="dense"
              variant="standard"
              fullWidth
              sx={newChatStyles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {newChatValues.loading && (
              <Box sx={newChatStyles.linarProgressContainer}>
                <LinearProgress />
              </Box>
            )}
            <Paper sx={newChatStyles.usersContainer}>
              <ScrollBar>
                <List>
                  {newChatValues.users.map((user) => (
                    <ListItem
                      key={user.id}
                      disablePadding
                      selected={newChatValues.selectedUser?.id === user.id}
                    >
                      <ListItemButton
                        onClick={() => newChatActions.handleUserSelection(user)}
                      >
                        <ListItemIcon>
                          <Avatar src={user.avatar} alt={user.username} />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {newChatValues.displayNotFound && (
                    <UserNotFound
                      username={newChatValues.debouncedUsernameFilter}
                    />
                  )}
                </List>
              </ScrollBar>
            </Paper>
          </Box>
        </DialogContent>
      </ScrollBar>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton
          text="create chat"
          loadingText="creating chat..."
          variant="text"
          loading={newChatValues.loadingSubmit}
          disabled={!newChatValues.selectedUser}
          fullWidth={false}
          onClick={newChatActions.handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};
