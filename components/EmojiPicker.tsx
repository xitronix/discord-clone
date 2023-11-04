import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger className="absolute flex justify-center items-center w-6 h-6 top-5 right-5 rounded-full">
        <Smile className="text-foreground hover:text-primary-foreground" />
      </PopoverTrigger>
      <PopoverContent className="bg-transparent shadow-none border-none p-0 mb-4 mr-16">
        <Picker
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          data={data}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  );
};
