export const getRooms = async () => {
  const response = await fetch(
    "https://devconnect-mp2n.onrender.com/api/rooms"
  );

  const data = await response.json();

  return data;
};

export const createRoom = async (name) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "https://devconnect-mp2n.onrender.com/api/rooms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    }
  );

  return response.json();
};