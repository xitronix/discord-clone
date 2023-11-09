import { useEffect, useState } from "react";

interface ChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  count,
}: ChatScrollProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const chatDiv = chatRef.current;

    const shouldAutoScroll = () => {
      if (!isInitialized && bottomDiv) {
        setIsInitialized(true);
        return true;
      }
      if (!chatDiv) {
        return false;
      }
      const distanceFromBottom =
        chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight;

      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, isInitialized, count]);
};
