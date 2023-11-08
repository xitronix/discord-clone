import { Member, Message, Profile, Server } from "@prisma/client";

export type MembersWithProfile = Member & { profile: Profile };

export type ServerWithMembersWithProfile = Server & {
  members: MembersWithProfile[];
};

export type MessageWithMembersWithProfile = Message & {
  member: MembersWithProfile;
};
