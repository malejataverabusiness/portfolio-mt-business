"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/quote/supabase/client";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/quote/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(
          authError.message === "Invalid login credentials"
            ? "Invalid email or password."
            : authError.message
        );
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm space-y-5"
    >
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="admin@mtblabs.com"
          className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg animate-spin">
              progress_activity
            </span>
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 shadow-lg mb-6">
            <span className="material-symbols-outlined text-white text-3xl">
              request_quote
            </span>
          </div>
          <h1 className="text-2xl font-light tracking-tight text-slate-900">
            MTB Quote <span className="font-bold">Admin</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to manage quotes and pricing.
          </p>
        </div>

        {/* Login Form with Suspense */}
        <Suspense
          fallback={
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm text-center text-sm text-slate-500">
              Loading login form...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-3">
          <Link
            href="/quote"
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to Public Quoter
          </Link>
        </div>
      </div>
    </div>
  );
}
