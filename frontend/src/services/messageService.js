export const getMessages = async (roomId) => {
  const response = await fetch(
    `http://localhost:5000/api/messages/${roomId}`
  );

  const data = await response.json();

  return data;
};