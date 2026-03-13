"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-dongker flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 border-2 border-gold flex items-center justify-center mx-auto mb-4">
            <span className="font-serif text-gold font-bold text-xl">N</span>
          </div>
          <h1 className="font-serif text-2xl text-cream font-semibold">
            Panel Admin
          </h1>
          <p className="font-sans text-cream/40 text-sm mt-1">
            Kantor Notaris
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-dongker-dark border border-dongker-light/30 p-8 space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-500/30 p-3">
              <p className="font-sans text-sm text-red-300">{error}</p>
            </div>
          )}

          <div>
            <label className="font-sans text-xs text-cream/50 tracking-wider uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dongker border border-dongker-light/40 text-cream font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@admin.com"
            />
          </div>

          <div>
            <label className="font-sans text-xs text-cream/50 tracking-wider uppercase block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-dongker border border-dongker-light/40 text-cream font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-dongker-dark font-sans font-semibold py-3 text-sm tracking-wide hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
