import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavSidebar } from "./navigation/NavSidebar";

export const MobileToggle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-20">
          <NavSidebar />
        </div>
        {children}
      </SheetContent>
    </Sheet>
  );
};
