import { useRef } from "react";
import { ArrowUp, Paperclip, SlidersHorizontal } from "lucide-react";

const MessageInput = ({ value, onChange, onSend, disabled = false }) => {
  const textareaRef = useRef(null);

  const submitMessage = (event) => {
    event?.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;

    onSend(message);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  const resizeTextarea = (event) => {
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 180)}px`;
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-3 pb-3 sm:px-6 sm:pb-5">
      <form
        onSubmit={submitMessage}
        className="rounded-2xl border border-violet-200/90 bg-white/95 p-2 shadow-[0_16px_55px_-28px_rgba(109,40,217,0.38)] backdrop-blur-xl transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100/80 sm:rounded-3xl sm:p-3"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onInput={resizeTextarea}
          rows={1}
          disabled={disabled}
          placeholder="Message Knowvia AI..."
          aria-label="Message Knowvia AI"
          className="block max-h-[180px] min-h-[44px] w-full resize-none bg-transparent px-3 py-3 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60 sm:px-4"
        />
        <div className="flex items-center justify-between gap-2 px-1 pb-1 sm:px-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="File attachments (not connected)"
              title="File attachments can be connected later"
              className="rounded-xl p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <Paperclip size={18} />
            </button>
            <button
              type="button"
              aria-label="Chat settings (not connected)"
              title="Chat settings"
              className="rounded-xl p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <SlidersHorizontal size={18} />
            </button>
            <span className="hidden pl-2 text-[11px] text-slate-400 sm:inline">
              Enter to send · Shift + Enter for a new line
            </span>
          </div>
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:h-11 sm:w-11 sm:rounded-2xl"
          >
            <ArrowUp size={20} strokeWidth={2.2} />
          </button>
        </div>
      </form>
      <p className="mt-2.5 px-2 text-center text-[10px] leading-4 text-slate-400 sm:text-xs">
        Knowvia AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default MessageInput;
