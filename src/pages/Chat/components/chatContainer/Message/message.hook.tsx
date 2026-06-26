import { useState, ReactEventHandler } from "react";
import { getMessageStyles } from "./message.styles";
import { User } from "@/shared/interfaces";
import { useCurrentUser } from "@/shared/contexts/AuthContext";

export const useMessage = (user: User, error: boolean) => {
  const currentUser = useCurrentUser();
  const isLoggedUser: boolean = user.id === currentUser.user.id;
  const MessageStyles = getMessageStyles(isLoggedUser, error);
  const [mediaHeight, setMediaHeight] = useState<number | undefined>(270);

  const handleMediaLoad: ReactEventHandler = (): void => {
    setMediaHeight(undefined);
  };

  return {
    messageValues: { MessageStyles, mediaHeight, isLoggedUser },
    messageActions: { handleMediaLoad },
  };
};
