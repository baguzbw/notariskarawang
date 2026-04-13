export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dongker z-50 flex items-center justify-center overflow-hidden">
      {/* diagonal hatching background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* sweep line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)",
            animation: "sweep 1.8s ease-in-out infinite",
          }}
        />
      </div>

      {/* center content */}
      <div style={{ animation: "fadeUp 0.5s ease forwards" }} className="relative flex flex-col items-center gap-6">
        {/* monogram */}
        <div className="relative">
          {/* rotating ring */}
          <svg width="88" height="88" viewBox="0 0 88 88" className="absolute -inset-[10px]" style={{ animation: "spin 3s linear infinite" }}>
            <circle cx="44" cy="44" r="40" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="62 188" strokeLinecap="round" />
          </svg>

          {/* box */}
          <div className="w-16 h-16 border-2 border-gold flex items-center justify-center relative" style={{ animation: "pulse 2s ease-in-out infinite" }}>
            {/* corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />

            <span className="text-gold font-bold text-3xl select-none">N</span>
          </div>
        </div>

        {/* wordmark */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-cream/80 text-xs tracking-[0.3em] uppercase" style={{ animation: "blink 1.8s ease-in-out infinite" }}>
            Memuat
          </p>
          {/* dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-gold"
                style={{
                  animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* bottom rule */}
        <div className="w-px bg-gold/30 origin-top" style={{ height: "32px", animation: "growDown 0.6s ease forwards 0.2s", transform: "scaleY(0)" }} />
      </div>

      <style>{`
        @keyframes sweep {
          0%   { left: -4%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 104%; opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 #C9A84C22; }
          50%       { box-shadow: 0 0 0 8px #C9A84C00; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes growDown {
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
