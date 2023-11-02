"use client";

import { useSocket } from "@/context/Socket";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnnected } = useSocket();

  if (!isConnnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-primary-foreground border-none"
      >
        Fallback: Pooling every 1s
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="bg-green-600 text-primary-foreground border-none"
    >
      Live: Real-time updates
    </Badge>
  );
};
