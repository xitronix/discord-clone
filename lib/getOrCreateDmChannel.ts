export const getOrCreateDmChannel = async (ownerId: string, recipientId: string) => {
  try {
    const response = await fetch("/api/dm-channels", {
      body: JSON.stringify({
        ownerId,
        recipientId,
      }),
      method: "POST",
    });
    return response.json();
  } catch (e) {
    console.error("Canot create dm channel");
  }
};
