"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button className="group">
          <div className="flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden justify-center items-center bg-background group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-foreground transition text-emerald-700"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
