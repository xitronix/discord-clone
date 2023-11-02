import { UserAvatar } from "../UserAvatar";

interface DmChannelHeaderProps {
  name: string;
  imageUrl: string;
  children: React.ReactNode;
}

export const DmChannelHeader = ({
  name,
  imageUrl,
  children,
}: DmChannelHeaderProps) => {
  return (
    <div className="flex gap-2 items-center font-semibold w-full px-3 h-12 border-b-2 border-secondary text-primary-foreground">
      {children}
      <UserAvatar className="md:h-6 md:w-6" src={imageUrl} name={name} />
      {name}
    </div>
  );
};
