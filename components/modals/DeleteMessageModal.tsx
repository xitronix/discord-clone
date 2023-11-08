"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { useState } from "react";

export const DeleteMessageModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { url },
  } = useModal();
  const isModalOpen = isOpen && type === "deleteMessage";
  const [isLoading, setIsLoading] = useState(false);

  if (!isModalOpen) {
    return null;
  }

  if (!url) {
    throw new Error("Url is missing");
  }
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="px-6">
          <DialogTitle className="text-center text-bold text-xl">
            Delete message
          </DialogTitle>
        </DialogHeader>
        <div className="px-6">Are you sure you want to delete message?</div>
        <DialogFooter>
          <Button variant="link" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                await fetch(url, {
                  method: "DELETE",
                });
                onClose();
              } catch (e) {
                console.error(e);
              } finally {
                setIsLoading(false);
              }
            }}
            variant="destructive"
          >
            Delete Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
