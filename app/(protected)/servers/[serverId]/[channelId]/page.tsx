"use client";

import { useParams } from "next/navigation";

const ChannelPage = () => {
  const params = useParams();
  return (
    <div>
      Channel Page <br />
      ServerId {params.serverId}
      ChannelId {params.channelId}
    </div>
  );
};

export default ChannelPage;
