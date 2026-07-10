import { useState, ReactEventHandler } from "react";
import { User } from "@/shared/interfaces";
import { useCurrentUser } from "@/shared/contexts/AuthContext";
import {
  getDynamicMessageStyles,
  getMediaPlaceholderStyles,
  MEDIA_PLACEHOLDER_HEIGHT,
} from "./message.styles";

export const useMessage = (user: User, error: boolean) => {
  const currentUser = useCurrentUser();
  const isLoggedUser: boolean = user.id === currentUser.user.id;
  const dynamicMessageStyles = getDynamicMessageStyles(isLoggedUser, error);

  // Reserves the media's worst-case final height before it has loaded, so
  // useChatMain's scroll-to-bottom effect (which fires as soon as the message
  // is added to the list, not once the media is ready) measures the correct
  // scrollHeight on its first pass. Cleared back to `undefined` on load so
  // smaller media can settle into its natural size.
  const [mediaHeight, setMediaHeight] = useState<number | undefined>(
    MEDIA_PLACEHOLDER_HEIGHT
  );

  const handleMediaLoad: ReactEventHandler = (): void => {
    setMediaHeight(undefined);
  };

  const mediaPlaceholderStyles = getMediaPlaceholderStyles(mediaHeight);

  return {
    messageValues: {
      dynamicMessageStyles,
      mediaPlaceholderStyles,
      isLoggedUser,
    },
    messageActions: { handleMediaLoad },
  };
};
