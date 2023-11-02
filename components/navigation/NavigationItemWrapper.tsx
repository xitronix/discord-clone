"use client";

import { cn } from "@/lib";

export const NavigationActionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="group">
      <div
        className={cn(
          "flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden justify-center items-center bg-background group-hover:bg-green-600 text-green-600",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
