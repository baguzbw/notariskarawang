export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-32 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-48 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-cream-light border border-cream-dark p-6 animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-8 h-0.5 bg-gold/30 mb-5" />
                <div className="h-5 w-3/4 bg-cream-dark rounded mb-3" />
                <div className="h-3 w-full bg-cream-dark rounded mb-2" />
                <div className="h-3 w-4/5 bg-cream-dark rounded mb-2" />
                <div className="h-3 w-2/3 bg-cream-dark rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
