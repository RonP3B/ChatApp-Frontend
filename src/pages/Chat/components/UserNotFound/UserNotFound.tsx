import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { userNotFoundStyles } from "./userNotFoundStyles";
import { UserNotFoundProps } from "./UserNotFoundProps";

export const UserNotFound = ({ username }: UserNotFoundProps) => {
  return (
    <Box sx={userNotFoundStyles.conatiner}>
      <SearchOffIcon sx={userNotFoundStyles.icon} />
      <Typography variant="h6">User not found</Typography>
      <Typography variant="body2">
        There are no results for: &nbsp;
        <strong>&quot;{username}&quot;</strong>
      </Typography>
    </Box>
  );
};
