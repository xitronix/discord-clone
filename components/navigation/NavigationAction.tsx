"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { useModal } from "@/hooks/useModalStore";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div onClick={() => onOpen("createServer")}>
      <ActionTooltip side="right" align="center" label="add a server">
        <div className="group">
          <div className="flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden justify-center items-center bg-background group-hover:bg-green-600">
            <Plus
              className="group-hover:text-foreground transition text-green-600 group-hover:text-white"
              size={25}
            />
          </div>
        </div>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
