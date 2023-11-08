import { useSocket } from "@/context/Socket";
import { MessageWithMembersWithProfile } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ChatSocketProps {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (newMessage: MessageWithMembersWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            messages: page.messages.map((message: MessageWithMembersWithProfile) => {
              if (message.id === newMessage.id) {
                return newMessage;
              }
              return message;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: MessageWithMembersWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
              },
            ],
          };
        }
        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        };
        return { ...oldData, pages: newData };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, addKey, updateKey, queryClient, queryKey]);
};
