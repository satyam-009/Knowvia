
import { Sparkles, BrainCircuit } from "lucide-react";

const LoadingScreen = ({ message = "Preparing your workspace..." }) => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 text-slate-950">
            {/* Ambient lavender glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />

            <main className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
                {/* Animated logo */}
                <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-[28px] bg-violet-200/40 [animation-duration:2.5s]" />

                    <div className="absolute inset-1 animate-spin rounded-[26px] border border-violet-200 border-t-violet-600 [animation-duration:4s]" />

                    <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-[22px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-200/70">
                        <BrainCircuit size={34} strokeWidth={1.7} />
                        <Sparkles
                            size={16}
                            className="absolute -right-1 -top-1 fill-white text-white"
                        />
                    </div>
                </div>

                {/* Brand */}
                <h1 className="text-3xl font-bold tracking-tight">
                    Knowvia <span className="text-violet-600">AI</span>
                </h1>

                <p className="mt-3 text-sm text-slate-500">
                    Intelligence at your fingertips.
                </p>

                {/* Loading indicator */}
                <div className="mt-10 flex items-center gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
                </div>

                <p
                    aria-live="polite"
                    className="mt-4 text-sm font-medium text-slate-600"
                >
                    {message}
                </p>

                {/* Progress shimmer */}
                <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-violet-100">
                    <div className="h-full w-2/5 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                </div>

                <p className="mt-8 text-xs text-slate-400">
                    A little intelligence is on its way.
                </p>
            </main>

            <style>{`
        @keyframes loading {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(260%); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
