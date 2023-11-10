"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionTooltip from "../ActionTooltip";
import { Button } from "../ui/button";
import { Video, VideoOff } from "lucide-react";

interface ChatVideoButton {}

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const isVideoCall = searchParams?.get("video");
  const Icon = isVideoCall ? VideoOff : Video;

  const onClick = () => {
    router.push(`${pathname}${isVideoCall ? "" : "?video=true"}`);
  };
  return (
    <ActionTooltip
      side="bottom"
      label={isVideoCall ? "End video call" : "Start video call"}
    >
      <Icon onClick={onClick} className="h-6 w-6" />
    </ActionTooltip>
  );
};
