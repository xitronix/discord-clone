"use client";

import { useAuth } from "@/context/Auth";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantAudioTile,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import "@livekit/components-styles";

interface MediaRoomProps {
  channelId: string;
  video: boolean;
}

export const MediaRoom = ({ channelId, video }: MediaRoomProps) => {
  const { user } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.email) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          `/api/livekit-participant-token?room=${channelId}&username=${user.email}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user?.email, channelId]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      video={video}
      audio={true}
      connect={true}
      data-lk-theme="default"
      className="min-w-0 overflow-x-clip"
    >
      {video ? <MyVideoConference /> : <MyAudioConference />}
    </LiveKitRoom>
  );
};

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <>
      <GridLayout
        tracks={tracks}
        style={{ height: "calc(100% - var(--lk-control-bar-height))" }}
      >
        <ParticipantTile />
      </GridLayout>
      <RoomAudioRenderer />
      <ControlBar variation="minimal" className="min-w-0" />
    </>
  );
}

function MyAudioConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <>
      <GridLayout
        tracks={tracks}
        style={{ height: "calc(100% - var(--lk-control-bar-height))" }}
      >
        <ParticipantAudioTile />
      </GridLayout>
      <ControlBar
        variation="minimal"
        controls={{ camera: false, screenShare: false }}
        className="min-w-0"
      />
    </>
  );
}
