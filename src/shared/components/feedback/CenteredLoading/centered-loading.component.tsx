import { Box, CircularProgress } from "@mui/material";
import { centeredLoadingStyles } from "./centered-loading.styles";

export const CenteredLoading: React.FC = () => {
  return (
    <Box sx={centeredLoadingStyles.container}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
