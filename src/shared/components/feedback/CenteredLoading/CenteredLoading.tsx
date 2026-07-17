import { Box, CircularProgress } from "@mui/material";
import { centeredLoadingStyles } from "./centeredLoadingStyles";

export const CenteredLoading = () => {
  return (
    <Box sx={centeredLoadingStyles.container}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
