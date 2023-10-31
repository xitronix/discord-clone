import { db } from "./db";

export const getOrCreateDMChannel = async (
  ownerId: string,
  recipientId: string
) => {
  try {
    const dmChannel = await findDMChannel(ownerId, recipientId);

    return dmChannel || (await createDMChannel(ownerId, recipientId));
  } catch (e) {
    console.error(e);
  }
};
export const findDMChannel = async (member1Id: string, member2Id: string) => {
  try {
    return db.dMChannel.findFirst({
      where: {
        OR: [
          { AND: [{ ownerId: member1Id }, { recipientId: member2Id }] },
          { AND: [{ ownerId: member2Id }, { recipientId: member1Id }] },
        ],
      },
      include: {
        owner: true,
        recipient: true,
      },
    });
  } catch (e) {
    return null;
  }
};

export const createDMChannel = async (ownerId: string, recipientId: string) => {
  try {
    return db.dMChannel.create({
      data: {
        ownerId,
        recipientId,
      },
      include: {
        owner: true,
        recipient: true,
      },
    });
  } catch (e) {
    console.error("createDMChannel", e);
    return null;
  }
};
