export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-32 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-44 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-cream-light border border-cream-dark p-6 animate-pulse"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-full h-48 bg-cream-dark mb-4" />
                <div className="h-6 w-3/4 bg-cream-dark rounded mb-3" />
                <div className="h-3 w-full bg-cream-dark rounded mb-2" />
                <div className="h-3 w-full bg-cream-dark rounded mb-2" />
                <div className="h-3 w-2/3 bg-cream-dark rounded mb-4" />
                <div className="flex gap-4">
                  <div className="h-3 w-28 bg-cream-dark rounded" />
                  <div className="h-3 w-20 bg-cream-dark rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
