import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Send a message or continue an existing chat
export const sendMessage = async ({ message, chatId = null }) => {
  const response = await api.post("/api/chats/message", {
    message,
    chat: chatId,
  });

  return response.data;
};

// Fetch all chats belonging to the logged-in user
export const fetchChats = async () => {
  const response = await api.get("/api/chats");

  return response.data;
};

// Fetch messages belonging to a specific chat
export const fetchMessages = async (chatId) => {
  const response = await api.get(`/api/chats/${chatId}/messages`);

  return response.data;
};

// Delete a specific chat
export const deleteChat = async (chatId) => {
  const response = await api.delete(`/api/chats/chat/${chatId}`);

  return response.data;
};