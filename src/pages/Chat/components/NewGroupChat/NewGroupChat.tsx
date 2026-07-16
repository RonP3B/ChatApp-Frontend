import { useNewGroupChat } from "./useNewGroupChat";
import { newGroupChatStyles } from "./newGroupChatStyles";
import { MembersForm } from "./MembersForm/MembersForm";
import { GroupInfoForm } from "./GroupInfoForm/GroupInfoForm";
import { Dialog, DialogTitle, Divider } from "@mui/material";
import { NewGroupChatProps } from "./NewGroupChatProps";

export const NewGroupChat: React.FC<NewGroupChatProps> = ({
  open,
  handleClose,
}) => {
  const { newGroupChatValues, newGroupChatActions } = useNewGroupChat();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{ paper: { sx: newGroupChatStyles.dialogContainer } }}
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
