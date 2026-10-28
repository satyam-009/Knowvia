
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, loading, error } = useAuth();


  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      // The useAuth hook stores the error in Redux.
      console.error("Login failed:", err.response?.data?.message);
    }
  }


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10 text-slate-950">
      {/* Soft lavender background accents */}
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
          onClick={() => navigate("/")}
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
            New to Knowvia?
          </span>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="rounded-xl border border-violet-200 bg-white/80 px-4 py-2.5 font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
          >
            Register
          </button>
        </nav>
      </header>

      {/* Login Form */}
      <main className="relative z-10 w-full max-w-md pt-16">
        <div className="mb-8 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-sm font-medium text-violet-700">
            Welcome back
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-[42px]">
            Welcome <span className="text-violet-600">Back</span>
          </h1>

          <p className="mt-3 text-base text-slate-500">
            Log in to your Knowvia AI account
          </p>
        </div>

        <section className="rounded-3xl border border-violet-100/90 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(109,40,217,0.24)] backdrop-blur sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => {
                    // Password reset can be implemented later.
                  }}
                  className="text-xs font-medium text-violet-600 transition hover:text-violet-800"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                <LockKeyhole
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200/80 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              Log in
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-violet-600 hover:text-violet-800"
            >
              Register
            </button>
          </p>
        </section>

        <p className="mt-7 text-center text-xs text-slate-400">
          By continuing, you agree to Knowvia AI’s Terms and Privacy Policy.
        </p>
      </main>
    </div>
  );
};

export default Login;
