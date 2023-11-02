"use client";

import { cn } from "@/lib";
import { useParams, usePathname } from "next/navigation";

export const NavigationActionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // cn(
  //   "relative flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden justify-center items-center",
  //   params?.serverId === id && "bg-primary/10 text-primary rounded-2xl"
  // )}
  const pathname = usePathname();
  console.log(pathname);
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
