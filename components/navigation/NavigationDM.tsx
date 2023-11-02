"use client";

import { usePathname, useRouter } from "next/navigation";
import ActionTooltip from "../ActionTooltip";
import { NavigationActionWrapper } from "./NavigationItemWrapper";
import { MessageCircle } from "lucide-react";

export const NavigationDM = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div onClick={() => router.push("/servers/me")}>
      <ActionTooltip side="right" align="center" label="dirrect messages">
        <NavigationActionWrapper
          className={
            pathname.includes("/me/")
              ? "bg-green-600 text-primary-foreground rounded-2xl"
              : undefined
          }
        >
          <MessageCircle
            className="group-hover:text-foreground transition group-hover:text-white"
            size={25}
          />
        </NavigationActionWrapper>
      </ActionTooltip>
    </div>
  );
};
