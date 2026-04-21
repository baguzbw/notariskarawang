"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-dongker flex items-center justify-center px-4 relative overflow-hidden">

      {/* Dekorasi background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-dongker-light/40 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-sm relative">

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-gold/60 flex items-center justify-center mx-auto mb-5">
            <span className="text-gold font-bold text-xl">N</span>
          </div>
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Panel Admin</p>
          <h1 className="text-2xl text-cream font-semibold">Notaris Norman</h1>
          <div className="w-10 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-dongker-dark border border-dongker-light/30 p-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-900/30 border border-red-500/30 p-3.5">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs text-cream/50 tracking-[0.15em] uppercase block mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/25 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dongker border border-dongker-light/40 text-cream text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/20"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-cream/50 tracking-[0.15em] uppercase block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/25 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dongker border border-dongker-light/40 text-cream text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-dongker-dark font-semibold py-3 text-sm tracking-widest uppercase hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-cream/20 text-xs mt-6 tracking-wide">
          Akses terbatas untuk administrator
        </p>
      </div>
    </div>
  );
}
