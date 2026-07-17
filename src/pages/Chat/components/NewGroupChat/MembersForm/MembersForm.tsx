import { ScrollBar } from "@/pages/Chat/components";
import { newGroupChatStyles } from "../newGroupChatStyles";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useMembersForm } from "./useMembersForm";
import { Formik, Form } from "formik";
import { MembersFormProps } from "./MembersFormProps";
import { UserNotFound } from "../../UserNotFound/UserNotFound";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";

export const MembersForm = ({
  handleClose,
  setActiveStep,
  setGroupMembers,
  groupMembers,
}: MembersFormProps) => {
  const { membersFormValues, membersFormActions } = useMembersForm(
    setActiveStep,
    setGroupMembers,
    groupMembers
  );

  return (
    <Formik
      initialValues={membersFormValues.initialValues}
      validationSchema={membersFormValues.validationSchema}
      onSubmit={membersFormActions.onSubmit}
    >
      {(formik) => (
        <Form>
          <Box sx={{ p: 1 }}>
            <TextField
              value={membersFormValues.usernameFilter}
              onChange={membersFormActions.handleInputChange}
              placeholder="Search users"
              autoComplete="off"
              margin="dense"
              variant="standard"
              fullWidth
              sx={newGroupChatStyles.input}
              error={
                formik.getFieldMeta("members").touched &&
                !!formik.getFieldMeta("members").error
              }
              helperText={
                formik.getFieldMeta("members").touched &&
                formik.getFieldMeta("members").error
              }
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

            {/* Selected users display */}
            {groupMembers.length > 0 && (
              <Box sx={{ my: 1 }}>
                {groupMembers.map((user) => (
                  <Chip
                    key={user.id}
                    avatar={<Avatar alt={user.username} src={user.avatar} />}
                    label={user.username}
                    variant="outlined"
                    sx={newGroupChatStyles.chipSpace}
                    onDelete={() =>
                      membersFormActions.removeSelectedUser(user.id, formik)
                    }
                  />
                ))}
              </Box>
            )}

            {/* loading state */}
            {membersFormValues.loading && (
              <Box sx={newGroupChatStyles.linarProgressContainer}>
                <LinearProgress />
              </Box>
            )}

            <Paper sx={newGroupChatStyles.usersContainer}>
              <ScrollBar>
                <List>
                  {membersFormValues.users.map((user) => (
                    <ListItem key={user.id} disablePadding>
                      <ListItemButton
                        selected={groupMembers.some(
                          (currUser) => currUser.id === user.id
                        )}
                        onClick={() =>
                          membersFormActions.handleUserAddition(user, formik)
                        }
                      >
                        <ListItemIcon>
                          <Avatar
                            src={user.avatar}
                            alt={user.username}
                            sx={newGroupChatStyles.avatar}
                          />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {membersFormValues.displayNotFound && (
                    <UserNotFound
                      username={membersFormValues.debouncedUsernameFilter}
                    />
                  )}
                </List>
              </ScrollBar>
            </Paper>
          </Box>
          <Divider />
          <Box sx={newGroupChatStyles.dialogFooter}>
            <Button onClick={handleClose}>cancel</Button>
            <Button type="submit">next</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
