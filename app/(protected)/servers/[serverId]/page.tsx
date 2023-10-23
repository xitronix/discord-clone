"use client";

const ServerIdPage = ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  return <div> ServerId Page [{serverId}]</div>;
};

export default ServerIdPage;
