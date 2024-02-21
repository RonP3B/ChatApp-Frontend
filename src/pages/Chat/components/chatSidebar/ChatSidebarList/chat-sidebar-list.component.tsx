import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { ScrollBar, NoChats, NewChat } from "../..";
import { ChatSidebarListStyles } from "./chat-sidebar-list.styles";
import { Box, List } from "@mui/material";
import { nanoid } from "nanoid";
import { ChatSidebarListProps } from "./chat-sidebar-list.interface";
import { ChatListItem } from "../ChatSidebarListItem/chat-list-item.component";

export const ChatSidebarList: React.FC<ChatSidebarListProps> = ({
  chatSidebarListValues,
  chatSidebarListActions,
}) => {
  return (
    <Box sx={ChatSidebarListStyles.container}>
      {chatSidebarListValues.loading &&
        new Array(40)
          .fill(0)
          .map(() => (
            <ChatListItem key={nanoid()} isLoading={true} room={undefined} />
          ))}
      <ScrollBar>
        <List>
          {chatSidebarListValues.displayChats &&
            chatSidebarListValues.filteredRooms.map((room) => (
              <ChatListItem key={room.id} isLoading={false} room={room} />
            ))}
          {chatSidebarListValues.displayNoChats && (
            <NoChats
              msg="There are no chats"
              chatSection={false}
              Icon={SpeakerNotesOffIcon}
              handleButton={chatSidebarListActions.openDialog}
            />
          )}
          {chatSidebarListValues.displayNotFound && (
            <NoChats
              msg="Chat not found"
              chatSection={false}
              Icon={SpeakerNotesOffIcon}
              handleButton={chatSidebarListActions.openDialog}
            />
          )}
        </List>
      </ScrollBar>
      <NewChat
        open={chatSidebarListValues.dialogOpened}
        handleClose={chatSidebarListActions.closeDialog}
      />
    </Box>
  );
};
