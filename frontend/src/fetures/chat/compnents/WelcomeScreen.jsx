import { BookOpen, FileText, Lightbulb, Code2, Sparkles } from "lucide-react";

const suggestions = [
  {
    title: "Explain a concept",
    description: "Get clear, simple explanations on any topic.",
    prompt: "Explain a concept in simple terms.",
    icon: BookOpen,
  },
  {
    title: "Summarize content",
    description: "Turn long text into concise summaries.",
    prompt: "Help me summarize some content.",
    icon: FileText,
  },
  {
    title: "Generate ideas",
    description: "Brainstorm ideas for projects, content, and more.",
    prompt: "Help me brainstorm ideas for a project.",
    icon: Lightbulb,
    warm: true,
  },
  {
    title: "Help with coding",
    description: "Get help with programming and debugging.",
    prompt: "Help me debug or improve some code.",
    icon: Code2,
  },
];

const WelcomeScreen = ({ onSuggestion }) => (
  <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-4 py-10 sm:px-6">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-sm shadow-violet-100 sm:h-20 sm:w-20">
      <Sparkles size={36} strokeWidth={1.8} />
    </div>
    <span className="mb-3 rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700 sm:text-sm">
      Your ideas, amplified
    </span>
    <h1 className="text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
      Welcome to{" "}
      <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Knowvia AI
      </span>
    </h1>
    <p className="mt-4 max-w-xl text-center text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
      Your intelligent companion for learning, creating, and solving problems.
    </p>

    <div className="mt-9 grid w-full grid-cols-1 gap-3 sm:mt-11 sm:grid-cols-2 sm:gap-4">
      {suggestions.map(({ title, description, prompt, icon: Icon, warm }) => (
        <button
          type="button"
          key={title}
          onClick={() => onSuggestion(prompt)}
          className="group flex min-h-[112px] items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-left shadow-sm shadow-slate-200/20 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100 sm:p-5"
        >
          <span
            className={[
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-105 sm:h-14 sm:w-14",
              warm ? "bg-amber-50 text-amber-500" : "bg-violet-50 text-violet-600",
            ].join(" ")}
          >
            <Icon size={25} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 pt-0.5">
            <span className="block font-semibold text-slate-900">{title}</span>
            <span className="mt-1.5 block text-sm leading-5 text-slate-500">{description}</span>
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default WelcomeScreen;
