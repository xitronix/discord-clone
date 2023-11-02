"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { useModal } from "@/hooks/useModalStore";
import { NavigationActionWrapper } from "./NavigationItemWrapper";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div onClick={() => onOpen("createServer")}>
      <ActionTooltip side="right" align="center" label="add a server">
        <NavigationActionWrapper>
          <Plus
            className="group-hover:text-foreground transition group-hover:text-white"
            size={25}
          />
        </NavigationActionWrapper>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
