import { AtSign, Hash } from "lucide-react";

export type ChatWelcomeProps = {
  name: string;
  type: "channel" | "dm";
};

export const ChatWelcome = ({ type, name }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      <div className="h-20 w-20 rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center dark:text-primary-foreground">
        {type === "channel" ? (
          <Hash className="h-12 w-12" />
        ) : (
          <AtSign className="h-12 w-12" />
        )}
      </div>
      <h1 className="text-2xl dark:text-primary-foreground font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </h1>
      {type !== "channel" && (
        <p className="text-l">
          This is the beginning of your direct messages history with <b>{name}</b>
        </p>
      )}
    </div>
  );
};
