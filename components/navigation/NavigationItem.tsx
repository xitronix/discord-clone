"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/ActionTooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div
        onClick={() => router.push(`/servers/${id}`)}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary-foreground rounded-r-full transition-all w-1",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id ? "h-8" : "h-2"
          )}
        />
        <div
          className={cn(
            "relative flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden justify-center items-center",
            params?.serverId === id && "bg-primary/10 text-primary rounded-2xl"
          )}
        >
          <Image fill alt={name.charAt(0).toUpperCase()} src={imageUrl} />
        </div>
      </div>
    </ActionTooltip>
  );
};
