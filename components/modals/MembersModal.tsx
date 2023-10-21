"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { UserAvatar } from "../UserAvatar";
import { CrownIcon, ShieldCheck } from "lucide-react";
import { MembersDropdown } from "../MembersDropdown";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-5 w-5" />,
  ADMIN: <CrownIcon className="h-4 w-4" />,
};

export const MembersModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();

  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-bold text-2xl">
            Manage members
          </DialogTitle>
          <DialogDescription className="text-center">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          {server?.members.map((member) => (
            <div key={member.id} className="flex justify-between items-center">
              <div className="flex gap-4 items-center p-2">
                <UserAvatar
                  src={member.profile.imageUrl}
                  name={member.profile.name}
                />
                <div className="flex flex-col gap-y-1">
                  <div className="flex gap-2 items-center">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs">{member.profile.email}</p>
                </div>
              </div>
              {server.profileId !== member.profile.id && (
                <MembersDropdown member={member} serverId={server.id} />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
