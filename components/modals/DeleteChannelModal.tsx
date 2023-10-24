"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { useState } from "react";

export const DeleteChannelModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server, channel },
  } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteChannel";
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="px-6">
          <DialogTitle className="text-center text-bold text-xl">
            Delete channel
          </DialogTitle>
        </DialogHeader>
        <div className="px-6">
          Are you sure you want to delete Delete &apos;{server?.name}&apos;?
          This action cannot be undone.
        </div>
        <DialogFooter>
          <Button variant="link" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                await fetch(
                  `/api/channels/${channel?.id}?serverId=${server?.id}`,
                  {
                    method: "DELETE",
                  }
                );
                onClose();
                router.refresh();
                router.push(`/servers/${server?.id}`);
              } catch (e) {
                console.error(e);
              } finally {
                setIsLoading(false);
              }
            }}
            variant="destructive"
          >
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
