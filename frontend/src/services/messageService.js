export const getMessages = async (roomId) => {
  const response = await fetch(
    `https://devconnect-mp2n.onrender.com/api/messages/${roomId}`
  );

  const data = await response.json();

  return data;
};