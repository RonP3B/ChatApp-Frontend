import { Box } from "@mui/material";
import { ScrollBar } from "../..";
import { chatMainStyles } from "./chat-main.styles";
import { useChatMain } from "./chat-main.hook";
import { Message } from "../Message/message.component";
import { NoMessages } from "../../feedback";

export const ChatMain: React.FC = () => {
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
