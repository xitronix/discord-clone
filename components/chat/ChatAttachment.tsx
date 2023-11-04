"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { UploadFile } from "../UploadFile";
import { Button } from "../ui/button";
import { useState } from "react";

interface ChatAttachmentProps {
  onChange: (url?: string) => void;
  value: string;
}

export const ChatAttachment = ({ onChange, value }: ChatAttachmentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      open={!!value || isOpen}
      onOpenChange={(open) => {
        if (!!value) {
          setIsOpen(false);
        }
        setIsOpen(open);
      }}
      modal={false}
    >
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button
          variant="secondary"
          size="icon"
          type="button"
          className="absolute flex justify-center items-center p-1 w-6 h-6 top-5 left-5 rounded-full bg-foreground hover:bg-primary-foreground"
        >
          <Plus className="text-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="translate-x-2/4 -translate-y-2 pb-5 text-xs font-meduim space-y-1"
      >
        <UploadFile
          onChange={onChange}
          value={value}
          endpoint="/api/server-image"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
