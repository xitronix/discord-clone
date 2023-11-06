import { MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../UserAvatar";
import ActionTooltip from "../ActionTooltip";
import { RoleIcon } from "../RoleIcon";

interface ChatMessageProps {
  id: string;
  content: string;
  profile: Profile;
  role?: MemberRole;
  timestamp: string;
  fileUrl: string | null;
  currentProfile?: Profile;
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
  currentProfile,
  isUpdated,
  deleted,
  socketUrl,
  socketQuery,
}: ChatMessageProps) => {
  return (
    <div className="relative group flex items-center hover:bg-secondary-background/5 p-4 transition w-full">
      <UserAvatar
        src={profile.imageUrl}
        name={profile.name}
        className="cursor-pointer howver:drop-shadow-md transition"
      />
      <div className="px-3 text-sm">
        <div className="flex gap-2 items-center">
          <p className="flex items-center gap-2 font-semibold cursor-pointer">
            {profile.name}
            {role && (
              <ActionTooltip label={role}>
                <RoleIcon role={role} />
              </ActionTooltip>
            )}
          </p>
          <span className="text-xs text-secondary-foreground">{timestamp}</span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};
