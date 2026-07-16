import { useSelectedChat } from "@/shared/contexts/ChatContext";
import { Message } from "@/shared/types";
import { useRef, useEffect } from "react";

const EMPTY_MESSAGES: Message[] = [];

export const useChatMain = () => {
  const selectedChat = useSelectedChat();
  const scrollBarRef = useRef<HTMLDivElement>();
  const messages: Message[] = selectedChat?.messages || EMPTY_MESSAGES;
  const noMessages: boolean = messages.length === 0;

  useEffect(() => {
    const currentScrollBar = scrollBarRef.current;
    if (currentScrollBar) {
      currentScrollBar.scrollTop = currentScrollBar.scrollHeight;
    }
  }, [messages]);

  return { chatMainValues: { scrollBarRef, noMessages, messages } };
};
