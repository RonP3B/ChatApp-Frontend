import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { userNotFoundStyles } from "./user-not-found.styles";

export const UserNotFound: React.FC<{ username: string }> = ({ username }) => {
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
