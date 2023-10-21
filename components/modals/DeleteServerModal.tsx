"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { useState } from "react";
import { Label } from "../ui/label";

export const DeleteServerModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteServer";
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [serverName, setServerName] = useState("");

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="px-6">
          <DialogTitle className="text-center text-bold text-xl">
            Delete &apos;{server?.name}&apos;
          </DialogTitle>
        </DialogHeader>
        <div className="p-2 mx-6 bg-yellow-500 rounded-sm">
          Are you sure you want to delete Delete &apos;{server?.name}&apos;? This action cannot be undone.
        </div>
        <div className="px-6">
          <Label className="uppercase text-xs font-bold">
            Enter Server Name
          </Label>
          <Input
            id={server?.id}
            value={serverName}
            onChange={(event) => setServerName(event.target.value)}
            className="dark:bg-zinc-600/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter server name"
          />
          <p className={"text-sm font-medium text-destructive"}>{error} </p>
        </div>
        <DialogFooter>
          <Button variant="link" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading || !serverName}
            onClick={async () => {
              if (serverName !== server?.name) {
                return setError("You didn't enter the server name correctly");
              }
              try {
                setIsLoading(true);
                await fetch(`/api/servers/${server?.id}`, {
                  method: "DELETE",
                });
                onClose();
                router.refresh();
                router.push("/");
              } catch (e) {
                console.error(e);
              } finally {
                setIsLoading(false);
              }
            }}
            variant="destructive"
          >
            Delete Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
