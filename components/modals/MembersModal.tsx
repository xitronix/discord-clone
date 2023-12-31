"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { UserAvatar } from "../UserAvatar";
import { MembersDropdown } from "../MembersDropdown";
import { Member } from "../Member";



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
          <DialogTitle className="text-center text-bold text-xl">
            Manage members
          </DialogTitle>
          <DialogDescription>
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
                  <Member name={member.profile.name} role={member.role} />
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
