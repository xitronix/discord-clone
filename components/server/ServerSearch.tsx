"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePathname, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = (id: string, type: 'channel' | 'member') => {
    setIsOpen(false);
    if (type === "channel") {
      router.push(`${pathname}/channels/${id}`);
    } else {
      router.push(`${pathname}/@me/${id}`);
    }
  };

  return (
    <>
      <Button
        className="group w-full text-primary-foreground/80 flex justify-between p-2 hover:bg-popover"
        variant="outline"
        onClick={() => setIsOpen((open) => !open)}
      >
        <p>Search</p>
        <Search className="h-4 w-4" />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ name, id, icon }) => (
                  <CommandItem
                    onSelect={() => onClick(id, type)}
                    key={id}
                    className="flex py-1 px-2 gap-2"
                  >
                    {icon} {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
