import { ThemeTogle } from "./ui/ThemeTogle";
import { UserButton } from "./UserButton";

export const NavBar = () => {
  return (
    <div className="w-full flex justify-end gap-4 p-2">
      <ThemeTogle />
      <UserButton />
    </div>
  );
};
