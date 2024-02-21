import { getRooms } from "@/pages/Chat/services";
import { useChatContext } from "@/shared/contexts";
import { useOpenDialog, useToast } from "@/shared/hooks";
import { Room } from "@/shared/interfaces";
import { getAxiosErrorMsg } from "@/shared/utils";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export const useChatSidebarList = (filterChat: string) => {
  const { openDialog, closeDialog, dialogOpened } = useOpenDialog();
  const { chatContextValues, chatContextActions } = useChatContext();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [displayNoChats, setDisplayNoChats] = useState<boolean>(false);

  useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      try {
        const res: AxiosResponse = await getRooms();
        const data: Room[] = res.data;
        chatContextActions.setRooms(data);
      } catch (error) {
        const errorMsg: string = getAxiosErrorMsg(error, "get chats");
        toast(errorMsg, { type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayNoChats(!loading && chatContextValues.rooms.length === 0);
  }, [loading, chatContextValues.rooms]);

  const filteredRooms: Room[] = chatContextValues.rooms.filter((room) =>
    room.name.toLowerCase().includes(filterChat.toLowerCase())
  );

  const displayChats: boolean =
    chatContextValues.rooms.length > 0 && filteredRooms.length > 0;

  const displayNotFound: boolean =
    chatContextValues.rooms.length > 0 && filteredRooms.length === 0;

  return {
    chatSidebarListValues: {
      loading,
      filteredRooms,
      dialogOpened,
      displayNoChats,
      displayNotFound,
      displayChats,
    },
    chatSidebarListActions: { openDialog, closeDialog },
  };
};
