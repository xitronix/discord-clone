"use client";

import { Plus } from "lucide-react";
import { UploadFile } from "../UploadFile";
import { Button } from "../ui/button";
import { useState } from "react";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";

interface ChatAttachmentProps {
  onChange: (url?: string) => void;
  value: string;
}

export const ChatAttachment = ({ onChange, value }: ChatAttachmentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      open={!!value || isOpen}
      onOpenChange={(open) => {
        if (!!value) {
          setIsOpen(false);
        }
        setIsOpen(open);
      }}
    >
      <PopoverTrigger className="focus:outline-none" asChild>
        <Button
          variant="secondary"
          size="icon"
          type="button"
          className="absolute flex justify-center items-center p-1 w-6 h-6 top-5 left-5 rounded-full bg-foreground hover:bg-primary-foreground"
        >
          <Plus className="text-background" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="md:translate-x-[40%] mb-2 pb-5 text-xs font-meduim w-fit"
      >
        <UploadFile
          onChange={onChange}
          value={value}
          endpoint="/api/server-image"
        />
      </PopoverContent>
    </Popover>
  );
};
