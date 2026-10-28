import useChat from "../hooks/useChat";
import ChatSidebar from "../compnents/ChatSidebar";
import ChatHeader from "../compnents/ChatHeader";
import WelcomeScreen from "../compnents/WelcomeScreen";
import ChatMessages from "../compnents/ChatMessages";
import MessageInput from "../compnents/MessageInput";

const Dashboard = () => {
  const chat = useChat();

  return (
    <div className="app-theme flex h-[100dvh] min-h-[520px] overflow-hidden" data-theme={chat.theme}>
      <ChatSidebar
        isOpen={chat.sidebarOpen}
        isDesktopOpen={chat.desktopSidebarOpen}
        onClose={() => {
          chat.setSidebarOpen(false);
          chat.setDesktopSidebarOpen(false);
        }}
        conversations={chat.conversations}
        activeConversationId={chat.activeConversationId}
        onSelectConversation={chat.selectConversation}
        onNewChat={chat.startNewChat}
        onDeleteConversation={chat.removeConversation}
        searchTerm={chat.searchTerm}
        onSearchChange={chat.setSearchTerm}
        user={chat.user}
        isLoading={chat.isLoadingHistory}
      />

      <main className="chat-main relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl dark:bg-violet-950/40" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-28 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-950/40" />

        <ChatHeader
          onOpenSidebar={() => {
            chat.setSidebarOpen(true);
            chat.setDesktopSidebarOpen((isOpen) => !isOpen);
          }}
          onNewChat={chat.startNewChat}
          user={chat.user}
          theme={chat.theme}
          onToggleTheme={chat.toggleTheme}
          onLogout={chat.handleLogout}
        />

        <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="chat-scroll min-h-0 flex-1 overflow-y-auto">
            {chat.isLoadingHistory ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                Loading your conversations…
              </div>
            ) : !chat.activeConversation || chat.activeConversation.messages.length === 0 ? (
              <WelcomeScreen onSuggestion={chat.setMessageInput} />
            ) : (
              <ChatMessages messages={chat.activeConversation.messages} isLoading={chat.isLoading} />
            )}
          </div>

          {chat.error && (
            <div role="alert" className="mx-auto mb-2 w-full max-w-4xl px-5 text-sm text-red-600">
              {chat.error}
            </div>
          )}

          <div className="composer-wrap relative z-10 shrink-0 pt-3">
            <MessageInput
              value={chat.messageInput}
              onChange={(event) => chat.setMessageInput(event.target.value)}
              onSend={chat.sendMessage}
              disabled={chat.isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
