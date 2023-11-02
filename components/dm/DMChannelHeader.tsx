import { UserAvatar } from "../UserAvatar";

interface DmChannelHeaderProps {
  name: string;
  imageUrl: string;
}

export const DmChannelHeader = ({ name, imageUrl }: DmChannelHeaderProps) => {
  return (
    <div className="flex items-center font-semibold w-full px-3 h-12 border-b-2 border-secondary justify-between">
      <div className="flex gap-2 text-primary-foreground">
        <UserAvatar className="md:h-6 md:w-6" src={imageUrl} name={name} />
        {name}
      </div>
    </div>
  );
};
