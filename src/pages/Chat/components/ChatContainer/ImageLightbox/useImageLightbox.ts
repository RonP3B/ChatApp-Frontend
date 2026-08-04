import { useState } from "react";

export const useImageLightbox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openLightbox = (): void => setIsOpen(true);
  const closeLightbox = (): void => setIsOpen(false);

  return {
    imageLightboxValues: { isOpen },
    imageLightboxActions: { openLightbox, closeLightbox },
  };
};
