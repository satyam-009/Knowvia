import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  LogOut,
  UserRound,
  Mail,
} from "lucide-react";

const getInitials = (user) => {
  const name = user?.username ?? user?.name ?? user?.email ?? "User";
  return name.slice(0, 1).toUpperCase();
};

const ChatHeader = ({
  onOpenSidebar,
  onNewChat,
  user,
  theme,
  onToggleTheme,
  onLogout,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const username = user?.username ?? user?.name ?? "Your account";
  const email = user?.email ?? "Email unavailable";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="chat-header relative z-20 flex h-[68px] shrink-0 items-center justify-between border-b px-3 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Toggle chat history"
          className="rounded-xl p-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
        >
          <Menu size={22} />
        </button>

        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-lg text-sm font-semibold md:hidden"
        >
          <Sparkles size={17} className="text-violet-600" />
          New chat
        </button>

        <span className="hidden truncate text-sm font-medium sm:inline">
          Your AI workspace
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="rounded-xl p-2.5 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
        >
          {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="h-7 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-xl p-1.5 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-semibold text-white">
              {getInitials(user)}
            </span>
            <ChevronDown size={16} className="hidden sm:block" />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="profile-menu absolute right-0 top-12 z-50 w-[min(82vw,280px)] rounded-2xl border p-2 shadow-xl shadow-slate-950/10"
            >
              <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-200">
                  {getInitials(user)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{username}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {email}
                  </p>
                </div>
              </div>

              <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

              <div className="space-y-1 px-2 py-2 text-xs text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <UserRound size={14} />
                  {username}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} />
                  <span className="truncate">{email}</span>
                </p>
              </div>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
