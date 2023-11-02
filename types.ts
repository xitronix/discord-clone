import { Member, Profile, Server } from "@prisma/client";

export type MembersWithProfile = Member & { profile: Profile };

export type ServerWithMembersWithProfile = Server & {
  members: MembersWithProfile[];
};

