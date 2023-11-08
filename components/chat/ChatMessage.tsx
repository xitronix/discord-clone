import { MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../UserAvatar";
import ActionTooltip from "../ActionTooltip";
import { RoleIcon } from "../RoleIcon";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib";
import { useModal } from "@/hooks/useModalStore";

interface ChatMessageProps {
  id: string;
  content: string;
  profile: Profile;
  role?: MemberRole;
  timestamp: string;
  fileUrl: string | null;
  isOwner: boolean;
  userRole: MemberRole;
  isUpdated: boolean;
  deleted: boolean;
  socketUrl: string;
  socketQuery: Array<{ key: string; value: string }>;
}

export const ChatMessage = ({
  id,
  content,
  profile,
  role,
  timestamp,
  fileUrl,
  userRole,
  isUpdated,
  isOwner,
  deleted,
  socketUrl,
  socketQuery,
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState<string>(content);
  const { onOpen } = useModal();

  const editMessageUrl = `${socketUrl}/${id}?${socketQuery
    .map(({ key, value }) => `${key}=${value}`)
    .join("&")}`;
  const isAdmin = userRole === MemberRole.ADMIN;
  const isModerator = userRole === MemberRole.MODERATOR;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && content;

  const onDelete = () => {
    onOpen("deleteMessage", {
      url: editMessageUrl,
    });
  };
  useEffect(() => {
    if (!isEditing) {
      return;
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setIsEditing(false);
        setNewContent(content);
      }
      if (e.code === "Enter") {
        if (!newContent) {
          onDelete();
        } else {
          modifyMessage("PATCH");
        }
      }
    };
    document.addEventListener("keyup", up);
    return () => document.removeEventListener("keyup", up);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newContent, isEditing]);

  const modifyMessage = async (method: "PATCH" | "DELETE") => {
    try {
      await fetch(editMessageUrl, {
        method,
        body: JSON.stringify({ content: newContent }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative group flex hover:bg-secondary-background/50 p-4 transition w-full",
        isEditing && "bg-secondary-background/50"
      )}
    >
      <UserAvatar
        src={profile.imageUrl}
        name={profile.name}
        className="cursor-pointer howver:drop-shadow-md transition"
      />
      <div className="px-3 text-sm flex flex-col gap-2">
        <div>
          <div className="flex gap-2 items-center">
            <p className="flex items-center gap-2 font-semibold cursor-pointer">
              {profile.name}
              {role && (
                <ActionTooltip label={role}>
                  <RoleIcon role={role} />
                </ActionTooltip>
              )}
            </p>
            <span className="text-xs text-secondary-foreground">
              {timestamp}
            </span>
          </div>
          {fileUrl && (
            <a
              href={fileUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="relative h-48 w-48 bg-background-secondary overflow-hiedden flex aspect-square rounded-md mt-2 items-center"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {!isEditing && (
            <p className="py-2">
              {newContent}
              {isUpdated && !deleted && (
                <span className="text-xs mx-2">(edited)</span>
              )}
            </p>
          )}
        </div>
        {isEditing && (
          <Input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            autoFocus
          />
        )}
        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center p-2 gap-2 rounded-sm bg-secondary/30 absolute -top-2 right-4">
            {canEditMessage && (
              <ActionTooltip label="edit">
                <Edit
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className="cursor-pointer dark:hover:text-primary-foreground w-4 h-4"
                />
              </ActionTooltip>
            )}
            <ActionTooltip label="delete">
              <Trash
                onClick={onDelete}
                className="cursor-pointer dark:hover:text-primary-foreground w-4 h-4"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </div>
  );
};
