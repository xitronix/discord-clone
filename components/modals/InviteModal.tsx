"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";

export const InviteModal = () => {
  const {
    isOpen,
    onClose,
    onOpen,
    type,
    data: { server },
  } = useModal();

  const origin = useOrigin();
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1000);
  };

  const generateNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/servers/${server?.id}/invite-code`, {
        method: "PATCH",
      });
      const newServer = (await response.json()).server;
      onOpen("invite", { server: newServer });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-bold text-2xl">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Label className="uppercase text-xs font-bold">Invite Link</Label>
          <div className="flex flex-row gap-4">
            <Input readOnly value={inviteLink} disabled={isLoading} />
            <Button
              onClick={onCopy}
              disabled={isLoading}
              variant="link"
              size="icon"
            >
              {isCopied ? <Check /> : <Copy />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={generateNewLink}
            variant="link"
            size="sm"
          >
            Generate a new link <RefreshCcw className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
