import { cn } from "@/lib";
import { ChannelType } from "@prisma/client";
import { Hash, Volume2, Video } from "lucide-react";

export const ChannelIcon = ({
  type,
  className,
}: {
  type: ChannelType;
  className?: string;
}) => {
  if (type === ChannelType.TEXT) {
    return <Hash className={cn("my-auto", className)} />;
  } else if (type === ChannelType.VOICE) {
    return <Volume2 className={cn("my-auto", className)} />;
  } else if (type === ChannelType.VIDEO) {
    return <Video className={cn("my-auto", className)} />;
  }
};
