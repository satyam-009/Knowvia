export const getChatId = (chat) => chat?._id ?? chat?.id ?? chat?.chatId ?? null;

export const getMessageContent = (message) =>
  typeof message === "string"
    ? message
    : message?.content ?? message?.message ?? message?.text ?? "";

export const normalizeMessage = (message, index = 0) => ({
  id: message?._id ?? message?.id ?? `message-${index}`,
  role: message?.role === "user" ? "user" : "assistant",
  content: getMessageContent(message),
});

export const normalizeChat = (chat) => ({
  id: getChatId(chat),
  title: chat?.title ?? chat?.name ?? "New chat",
  group: chat?.group ?? "Recent",
  messages: [],
});

export const getErrorMessage = (error) =>
  error?.response?.data?.message ??
  error?.message ??
  "Something went wrong. Please try again.";

export const getChatList = (data) => {
  const chats = data?.chats ?? data?.data ?? data;
  return Array.isArray(chats) ? chats : [];
};

export const getMessageList = (data) => {
  const messages = data?.messages ?? data?.data ?? data;
  return Array.isArray(messages) ? messages : [];
};
