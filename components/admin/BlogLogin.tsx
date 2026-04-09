"use client";

import { useEffect, useState } from "react";

interface BlogLoginProps {
  onAuthenticated: (password: string) => void;
  resetKey?: number;
}

export default function BlogLogin({ onAuthenticated, resetKey = 0 }: BlogLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Always start with a blank field when login view is shown.
    setPassword("");
    setError("");
  }, [resetKey]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Login failed");
        return;
      }

      const enteredPassword = password;
      setPassword("");
      onAuthenticated(enteredPassword);
    } catch {
      setError("Unable to login right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 py-16 text-[#c9b9a1]">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-800 bg-gray-950/70 p-8 backdrop-blur-sm">
        <h1 className="mb-2 text-2xl font-bold text-orange-500">Blog Admin Login</h1>
        <p className="mb-6 text-sm text-[#b8a88a]">Enter your password to open the management panel.</p>

        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm">Password</label>
            <input
              id="password"
              name="admin-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-black/60 px-4 py-3 outline-none transition-colors focus:border-orange-500"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Checking..." : "Open Admin Panel"}
          </button>
        </form>
      </div>
    </main>
  );
}
