import { useState } from "react";

export const useOpenDialog = () => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const closeDialog = (): void => {
    setDialogOpened(false);
  };

  const openDialog = (): void => {
    setDialogOpened(true);
  };

  return { dialogOpened, closeDialog, openDialog };
};
