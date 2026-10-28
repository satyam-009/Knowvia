
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Sparkles,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const { registerUser, loading, error } = useAuth();


  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");

    try {
      await registerUser(username.trim(), email.trim(), password);

      setSuccess("Account created successfully! Redirecting to login...");

      navigate("/login", {
        state: { message: "Registration successful. Please log in." },
      });
    } catch (err) {
      // The useAuth hook stores the error in Redux.
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message
      );
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10 text-slate-950">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-28 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl"
      />

      {/* Header */}
      <header className="absolute left-6 right-6 top-6 mx-auto flex max-w-6xl items-center justify-between sm:left-10 sm:right-10">
        <button
          type="button"
          onClick={() => navigate("/login")}
          aria-label="Knowvia AI home"
          className="flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Sparkles size={23} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-bold tracking-tight sm:text-2xl">
            Knowvia <span className="text-violet-600">AI</span>
          </span>
        </button>

        <nav className="flex items-center gap-2 text-sm sm:gap-3">
          <span className="hidden text-slate-500 sm:inline">
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-xl border border-violet-200 bg-white/80 px-4 py-2.5 font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
          >
            Log in
          </button>
        </nav>
      </header>

      {/* Registration form */}
      <main className="relative z-10 w-full max-w-md pt-16">
        <div className="mb-8 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-sm font-medium text-violet-700">
            Get started
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-[42px]">
            Create your <span className="text-violet-600">account</span>
          </h1>

          <p className="mt-3 text-base text-slate-500">
            Join Knowvia AI and start exploring.
          </p>
        </div>

        <section className="rounded-3xl border border-violet-100/90 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(109,40,217,0.24)] backdrop-blur sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Username
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                <UserRound size={18} className="shrink-0 text-slate-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  minLength={3}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Choose a username"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                <Mail size={18} className="shrink-0 text-slate-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                <LockKeyhole size={18} className="shrink-0 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="shrink-0 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Use at least 8 characters.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200/80 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              Create account
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-violet-600 hover:text-violet-800"
            >
              Log in
            </button>
          </p>
        </section>

        <p className="mt-7 text-center text-xs text-slate-400">
          By creating an account, you agree to Knowvia AI’s Terms and Privacy
          Policy.
        </p>
      </main>
    </div>
  );
};

export default Register;
