export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-40 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-44 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-2/3 bg-cream-dark rounded mb-12 animate-pulse" />
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-cream-light border border-cream-dark p-8 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-6 w-56 bg-cream-dark rounded mb-5" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[...Array(i % 2 === 0 ? 6 : 4)].map((_, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-gold/30 rounded mt-0.5 shrink-0" />
                      <div className="h-3 bg-cream-dark rounded flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
