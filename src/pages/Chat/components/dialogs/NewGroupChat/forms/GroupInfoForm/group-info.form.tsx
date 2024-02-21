import { Formik, Form } from "formik";
import { newGroupChatStyles } from "../../new-group-chat.styles";
import { GroupInfoFormProps } from "./group-info.form.interface";
import { ImageInput, InputField, SubmitButton } from "@/shared/components";
import { Box, Divider, Button } from "@mui/material";
import { useGroupInfoForm } from "./group-info.form.hook";

export const GroupInfoForm: React.FC<GroupInfoFormProps> = ({
  setActiveStep,
  handleClose,
  groupMembers,
}) => {
  const { groupInfoFormValues, groupInfoFormActions } = useGroupInfoForm(
    setActiveStep,
    handleClose,
    groupMembers
  );

  return (
    <Formik
      initialValues={groupInfoFormValues.initialValues}
      validationSchema={groupInfoFormValues.validationSchema}
      onSubmit={groupInfoFormActions.onSubmit}
    >
      {() => (
        <Form>
          <Box padding={1}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ImageInput
                name="groupImage"
                variant="standard"
                label="Group image"
              />
            </Box>
            <InputField
              label="Group name"
              name="groupName"
              variant="standard"
            />
          </Box>
          <Divider />
          <Box sx={newGroupChatStyles.dialogFooter}>
            <Button onClick={groupInfoFormActions.goPreviousStep}>back</Button>
            <SubmitButton
              variant="text"
              fullWidth={false}
              loading={groupInfoFormValues.loading}
              text="create group"
              loadingText="creating group..."
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
