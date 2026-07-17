import { SubmitButton } from "@/shared/components/formElements";
import { useNewChat } from "./useNewChat";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { newChatStyles } from "./newChatStyles";
import { NewChatProps } from "./NewChatProps";
import { ScrollBar } from "../ScrollBar/ScrollBar";
import { UserNotFound } from "../UserNotFound/UserNotFound";
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

export const NewChat = ({ open, handleClose }: NewChatProps) => {
  const { newChatValues, newChatActions } = useNewChat(handleClose);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{ paper: { sx: newChatStyles.dialogContainer } }}
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonSearchIcon />
                    </InputAdornment>
                  ),
                },
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
                    <ListItem key={user.id} disablePadding>
                      <ListItemButton
                        selected={newChatValues.selectedUser?.id === user.id}
                        onClick={() => newChatActions.handleUserSelection(user)}
                      >
                        <ListItemIcon>
                          <Avatar
                            src={user.avatar}
                            alt={user.username}
                            sx={newChatStyles.avatar}
                          />
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
