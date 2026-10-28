import { Search, Plus, MessageSquare, X, Sparkles, PanelLeftClose, Trash2 } from "lucide-react";

const ChatSidebar = ({
  isOpen,
  isDesktopOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  user,
  isLoading,
  searchTerm,
  onSearchChange,
}) => {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedConversations = [
    {
      title: "Today",
      items: filteredConversations.filter((conversation) => conversation.group === "Today"),
    },
    {
      title: "Yesterday",
      items: filteredConversations.filter((conversation) => conversation.group === "Yesterday"),
    },
    {
      title: "Last 7 days",
      items: filteredConversations.filter((conversation) => conversation.group === "Last 7 days"),
    },
    {
      title: "Recent",
      items: filteredConversations.filter((conversation) => conversation.group === "Recent"),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close conversation history"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={[
          "chat-sidebar fixed inset-y-0 left-0 z-50 flex w-[min(86vw,320px)] flex-col overflow-hidden border-r shadow-2xl backdrop-blur-xl transition-all duration-300 md:static md:z-auto md:shrink-0 md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isDesktopOpen ? "md:w-[285px] md:translate-x-0" : "md:w-0 md:-translate-x-full md:border-r-0",
        ].join(" ")}
        aria-label="Chat history sidebar"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
          <button
            type="button"
            onClick={onNewChat}
            aria-label="Knowvia AI new chat"
            className="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Sparkles size={22} strokeWidth={2.2} />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-950">
              Knowvia <span className="text-violet-600">AI</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-700 md:hidden"
          >
            <X size={19} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="hidden rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700 md:block"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={onNewChat}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
          >
            <Plus size={18} />
            New chat
          </button>
        </div>

        <div className="px-4 pb-4">
          <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search conversations..."
              aria-label="Search conversations"
              className="min-w-0 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
          {groupedConversations.map((group) => (
            <section key={group.title}>
              <h2 className="px-3 pb-2 text-xs font-semibold tracking-wide text-slate-400">
                {group.title}
              </h2>
              <ul className="space-y-1">
                {group.items.map((conversation) => (
                  <li key={conversation.id}>
                    <div
                      className={[
                        "group flex items-center rounded-xl transition",
                        activeConversationId === conversation.id
                          ? "bg-violet-50 text-violet-950 dark:bg-violet-950/60 dark:text-violet-100"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800",
                      ].join(" ")}
                    >
                    <button
                      type="button"
                      onClick={() => onSelectConversation(conversation.id)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                      <MessageSquare size={16} className="shrink-0 text-slate-400" />
                      <span className="truncate">{conversation.title}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteConversation(conversation.id)}
                      aria-label={`Delete ${conversation.title}`}
                      title="Delete conversation"
                      className="mr-1 rounded-lg p-2 text-slate-400 opacity-100 transition sm:opacity-0 hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-red-950/40"
                    >
                      <Trash2 size={14} />
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {isLoading && (
            <p className="px-3 py-4 text-sm text-slate-400">Loading chats…</p>
          )}
          {!isLoading && groupedConversations.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-slate-400">
              {searchTerm ? "No conversations found." : "Your chats will appear here."}
            </p>
          )}
        </nav>

        <div className="sidebar-footer shrink-0 border-t p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-semibold text-white">
              {(user?.username ?? user?.name ?? user?.email ?? "U").slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.username ?? user?.name ?? "Your account"}</p>
              <p className="truncate text-xs text-slate-400">{user?.email ?? "Knowvia workspace"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
