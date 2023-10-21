"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "leaveServer";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="p-2">
          <DialogTitle className="text-center text-bold text-xl">
            Leave &apos;{server?.name}&apos;
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-6">
          <div className="">
            Are you sure you want to leave<b> {server?.name}</b>? <br />
            You won&apos;t be able to rejoin this server unless you are
            re-invited
          </div>
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
                await fetch(`/api/servers/${server?.id}/leave`, {
                  method: "PATCH",
                });
                onClose();
                router.refresh();
                router.push('/');
              } catch (e) {
                console.error(e);
              } finally {
                setIsLoading(false);
              }
            }}
            variant="destructive"
          >
            Leave Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
