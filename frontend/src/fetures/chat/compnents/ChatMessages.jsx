
import { Bot, UserRound, Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const content =
    typeof message.content === "string" ? message.content : "";

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard may be unavailable in insecure contexts.
    }
  };

  const markdownStyles = [
    "min-w-0 max-w-none",
    "[&_h1]:mb-3 [&_h1]:mt-7 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-slate-900 dark:[&_h1]:text-slate-100",
    "[&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100",
    "[&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-slate-100",
    "[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0",
    "[&_p]:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:text-slate-700 dark:[&_p]:text-slate-300",
    "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6",
    "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6",
    "[&_li]:pl-1 [&_li]:text-slate-700 dark:[&_li]:text-slate-300 [&_li>p]:my-1",
    "[&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white",
    "[&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-violet-300",
    "[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-violet-300 [&_blockquote]:pl-4 [&_blockquote]:text-slate-500 dark:[&_blockquote]:border-violet-500 dark:[&_blockquote]:text-slate-400",
    "[&_hr]:my-6 [&_hr]:border-slate-200 dark:[&_hr]:border-slate-700",
    "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
    "[&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-800 dark:[&_th]:border-slate-700 dark:[&_th]:bg-slate-800 dark:[&_th]:text-slate-100",
    "[&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-slate-700 dark:[&_td]:border-slate-700 dark:[&_td]:text-slate-300",
    "[&_pre]:my-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-100",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit",
    "[&_code]:break-words [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-violet-700 dark:[&_code]:bg-slate-800 dark:[&_code]:text-violet-300",
    "[&_pre_code]:break-normal",
  ].join(" ");

  return (
    <div
      className={[
        "flex gap-3 sm:gap-4",
        isUser ? "flex-row-reverse" : "",
      ].join(" ")}
    >
      <div
        className={[
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
          isUser
            ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
            : "border border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
        ].join(" ")}
      >
        {isUser ? <UserRound size={17} /> : <Bot size={18} />}
      </div>

      <div
        className={[
          "group min-w-0 flex-1",
          isUser ? "max-w-[88%] text-right sm:max-w-[78%]" : "max-w-full",
        ].join(" ")}
      >
        <p className="mb-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {isUser ? "You" : "Knowvia AI"}
        </p>

        <div
          className={[
            "min-w-0 break-words rounded-2xl px-4 py-3 text-left text-sm leading-7 sm:px-5",
            isUser
              ? "whitespace-pre-wrap rounded-tr-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200/50"
              : "rounded-tl-md border border-slate-200/80 bg-white text-slate-800 shadow-sm shadow-slate-200/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
          ].join(" ")}
        >
          {isUser ? (
            content
          ) : (
            <div className={markdownStyles}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),

                  table: ({ children, ...props }) => (
                    <div className="my-4 max-w-full overflow-x-auto rounded-lg">
                      <table {...props}>{children}</table>
                    </div>
                  ),

                  code: ({ children, className, ...props }) => {
                    const match = /language-([\w-]+)/.exec(
                      className || ""
                    );

                    const language = match?.[1] || "text";
                    const code = String(children).replace(/\n$/, "");
                    const isBlock =
                      Boolean(match) || code.includes("\n");

                    if (!isBlock) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <CodeBlock
                        code={code}
                        language={language}
                      />
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && (
          <button
            type="button"
            onClick={copyMessage}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:hover:bg-violet-950 dark:hover:text-violet-300"
            aria-label="Copy AI response"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
};

const ChatMessages = ({ messages, isLoading }) => (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-7 px-4 py-7 sm:px-6 sm:py-9">
    {messages.map((message, index) => (
      <ChatMessage
        key={message._id ?? message.id ?? `${message.role}-${index}`}
        message={message}
      />
    ))}

    {isLoading && (
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
          <Bot size={17} />
        </div>

        <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
          <div
            className="flex items-center gap-1.5"
            aria-label="Knowvia AI is thinking"
            role="status"
          >
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.1s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
          </div>
        </div>
      </div>
    )}
  </div>
);

export default ChatMessages;
