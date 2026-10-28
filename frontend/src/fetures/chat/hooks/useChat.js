import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { deleteChat, fetchChats, fetchMessages, sendMessage as sendChatMessage } from "../services/chat.api";
import { getChatId, getChatList, getErrorMessage, getMessageContent, getMessageList, normalizeChat, normalizeMessage } from "../state/chat.state";

const useChat = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("knowvia-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const activeConversation = useMemo(
    () => conversations.find((chat) => chat.id === activeConversationId) ?? null,
    [conversations, activeConversationId]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("knowvia-theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    const loadConversations = async () => {
      setIsLoadingHistory(true);
      try {
        const data = await fetchChats();
        if (!cancelled) setConversations(getChatList(data).map(normalizeChat).filter((chat) => chat.id));
      } catch (requestError) {
        if (!cancelled) setError(getErrorMessage(requestError));
      } finally {
        if (!cancelled) setIsLoadingHistory(false);
      }
    };

    loadConversations();
    return () => { cancelled = true; };
  }, []);

  const startNewChat = useCallback(() => {
    setActiveConversationId(null);
    setMessageInput("");
    setError("");
    setSidebarOpen(false);
  }, []);

  const selectConversation = useCallback(async (conversationId) => {
    setActiveConversationId(conversationId);
    setMessageInput("");
    setError("");
    setSidebarOpen(false);

    const selected = conversations.find((chat) => chat.id === conversationId);
    if (selected?.messagesLoaded) return;

    try {
      const data = await fetchMessages(conversationId);
      const messages = getMessageList(data).map(normalizeMessage);
      setConversations((current) => current.map((chat) =>
        chat.id === conversationId ? { ...chat, messages, messagesLoaded: true } : chat
      ));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }, [conversations]);

  const sendMessage = useCallback(async (rawMessage) => {
    const content = rawMessage.trim();
    if (!content || isLoading) return;

    setMessageInput("");
    setError("");
    setIsLoading(true);

    const previousChatId = activeConversationId;
    const previousMessages = activeConversation?.messages ?? [];
    const localUserMessage = { id: `local-${Date.now()}`, role: "user", content };

    if (previousChatId) {
      setConversations((current) => current.map((chat) => chat.id === previousChatId
        ? { ...chat, messages: [...chat.messages, localUserMessage] }
        : chat
      ));
    }

    try {
      const result = await sendChatMessage({ message: content, chatId: previousChatId });
      const returnedChat = result?.chat ?? result?.data?.chat;
      const chatId = getChatId(returnedChat) ?? result?.chatId ?? result?.data?.chatId ?? previousChatId;
      const aiMessage = result?.aiResponse ?? result?.assistantMessage ?? result?.reply ?? result?.response ?? result?.data?.aiResponse;
      const aiContent = getMessageContent(aiMessage);

      if (!chatId) throw new Error("The server did not return a conversation ID.");
      if (!aiContent) throw new Error("The server did not return an AI response.");

      const savedUserMessage = result?.userMessage ?? result?.data?.userMessage;
      const savedUser = savedUserMessage ? normalizeMessage(savedUserMessage, Date.now()) : localUserMessage;
      const assistant = {
        id: aiMessage?._id ?? `assistant-${Date.now()}`,
        role: "assistant",
        content: aiContent,
      };
      const nextMessages = [...previousMessages, savedUser, assistant];
      const title = returnedChat?.title ?? (content.length > 36 ? `${content.slice(0, 36)}…` : content);

      setConversations((current) => {
        const exists = current.some((chat) => chat.id === chatId);
        if (exists) {
          return current.map((chat) => chat.id === chatId
            ? { ...chat, title: chat.title || title, messages: nextMessages, messagesLoaded: true }
            : chat
          );
        }
        return [{ ...normalizeChat(returnedChat ?? { _id: chatId, title }), id: chatId, title, messages: nextMessages, messagesLoaded: true }, ...current];
      });
      setActiveConversationId(chatId);
    } catch (requestError) {
      setMessageInput(content);
      setError(getErrorMessage(requestError));
      if (previousChatId) {
        setConversations((current) => current.map((chat) => chat.id === previousChatId
          ? { ...chat, messages: previousMessages }
          : chat
        ));
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeConversation, activeConversationId, isLoading]);

  const removeConversation = useCallback(async (conversationId) => {
    if (!window.confirm("Delete this conversation? This can't be undone.")) return;

    try {
      await deleteChat(conversationId);
      setConversations((current) => current.filter((chat) => chat.id !== conversationId));
      if (activeConversationId === conversationId) startNewChat();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }, [activeConversationId, startNewChat]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (logoutError) {
      setError(getErrorMessage(logoutError));
    }
  }, [logoutUser, navigate]);

  return {
    user, sidebarOpen, setSidebarOpen, desktopSidebarOpen, setDesktopSidebarOpen,
    searchTerm, setSearchTerm, messageInput, setMessageInput, activeConversationId,
    activeConversation, conversations, isLoading, isLoadingHistory, error, theme,
    startNewChat, selectConversation, sendMessage, removeConversation, handleLogout,
    toggleTheme: () => setTheme((current) => current === "light" ? "dark" : "light"),
  };
};

export default useChat;
