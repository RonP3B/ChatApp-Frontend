import { useNewGroupChat } from "./new-group-chat.hook";
import { newGroupChatStyles } from "./new-group-chat.styles";
import { MembersForm } from "./forms/MembersForm/members.form";
import { GroupInfoForm } from "./forms/GroupInfoForm/group-info.form";
import { Dialog, DialogTitle, Divider } from "@mui/material";

export const NewGroupChat: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const { newGroupChatValues, newGroupChatActions } = useNewGroupChat();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: newGroupChatStyles.dialogContainer }}
    >
      <DialogTitle>New Group Chat</DialogTitle>
      <Divider />
      {newGroupChatValues.activeStep === 0 && (
        <MembersForm
          setActiveStep={newGroupChatActions.setActiveStep}
          setGroupMembers={newGroupChatActions.setGroupMembers}
          groupMembers={newGroupChatValues.groupMembers}
          handleClose={() => {
            newGroupChatActions.setGroupMembers([]);
            handleClose();
          }}
        />
      )}
      {newGroupChatValues.activeStep === 1 && (
        <GroupInfoForm
          setActiveStep={newGroupChatActions.setActiveStep}
          groupMembers={newGroupChatValues.groupMembers}
          handleClose={() => {
            newGroupChatActions.setGroupMembers([]);
            handleClose();
          }}
        />
      )}
    </Dialog>
  );
};
