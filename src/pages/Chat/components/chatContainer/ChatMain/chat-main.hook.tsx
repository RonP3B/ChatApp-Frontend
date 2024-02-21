import { useChatContext } from "@/shared/contexts";
import { Message } from "@/shared/interfaces";
import { useRef, useEffect } from "react";

export const useChatMain = () => {
  const { chatContextValues } = useChatContext();
  const scrollBarRef = useRef<HTMLDivElement>();
  const messages: Message[] = chatContextValues.selectedChat!.messages;
  const noMessages: boolean = messages.length === 0;

  useEffect(() => {
    const currentScrollBar = scrollBarRef.current;
    if (currentScrollBar) {
      currentScrollBar.scrollTop = currentScrollBar.scrollHeight;
    }
  }, [messages]);

  return { chatMainValues: { scrollBarRef, noMessages, messages } };
};
