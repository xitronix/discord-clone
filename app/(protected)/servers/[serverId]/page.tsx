"use client";

const ServerIdPage = ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  return (
    <div className="grid bg-secondary h-full px-20 md:px-20 pr-64 text-center align-middle items-center">
      You find yourself in a strange place. You don't have access to any text
      channels, or there are none in this server.
    </div>
  );
};

export default ServerIdPage;
