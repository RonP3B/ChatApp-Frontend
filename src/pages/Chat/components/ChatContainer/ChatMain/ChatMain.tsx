import { Box } from "@mui/material";
import { ScrollBar } from "../..";
import { chatMainStyles } from "./chatMainStyles";
import { useChatMain } from "./useChatMain";
import { Message } from "../Message/Message";
import { NoMessages } from "../../NoMessages/NoMessages";

export const ChatMain = () => {
  const { chatMainValues } = useChatMain();

  return (
    <Box sx={chatMainStyles.container}>
      <ScrollBar
        sx={chatMainStyles.scrollbar}
        customRef={chatMainValues.scrollBarRef}
      >
        {chatMainValues.noMessages ? (
          <NoMessages />
        ) : (
          chatMainValues.messages.map((message) => (
            <Message
              key={message.id}
              user={message.sender}
              messageType={message.messageType}
              content={message.content}
              time={message.date}
              error={!!message.error}
            />
          ))
        )}
      </ScrollBar>
    </Box>
  );
};
