import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { ScrollBar, NoChats, NewChat } from "../..";
import { chatSidebarListStyles } from "./chatSidebarListStyles";
import { Box, List } from "@mui/material";
import { ChatSidebarListProps } from "./ChatSidebarListProps";
import { ChatSidebarListItem } from "../ChatSidebarListItem/ChatSidebarListItem";

export const ChatSidebarList = ({
  chatSidebarListValues,
  chatSidebarListActions,
}: ChatSidebarListProps) => {
  return (
    <Box sx={chatSidebarListStyles.container}>
      {chatSidebarListValues.loading &&
        new Array(40)
          .fill(0)
          .map((_, index) => (
            <ChatSidebarListItem
              key={index}
              isLoading={true}
              room={undefined}
            />
          ))}
      <ScrollBar>
        <List>
          {chatSidebarListValues.displayChats &&
            chatSidebarListValues.filteredRooms.map((room) => (
              <ChatSidebarListItem
                key={room.id}
                isLoading={false}
                room={room}
              />
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
