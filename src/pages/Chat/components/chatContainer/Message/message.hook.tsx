import { useAuthContext } from "@/shared/contexts";
import { useState, ReactEventHandler } from "react";
import { getMessageStyles } from "./message.styles";
import { User } from "@/shared/interfaces";

export const useMessage = (user: User, error: boolean) => {
  const { auth } = useAuthContext();
  const isLoggedUser: boolean = user.id === auth.user!.id;
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
